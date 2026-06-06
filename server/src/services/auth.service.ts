import {
    type RegisterUserWithEmailAndPasswordInputType,
    registerUserWithEmailAndPasswordInput,
    type LoginUserWithEmailAndPasswordInputType,
    loginUserWithEmailAndPasswordInput,
} from "../type/auth.type.js";

import { db } from "../config/db.js";
import { usersTable } from "../db/schema.js";

import { eq } from "drizzle-orm";

import crypto from "crypto";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../config/jwt.js";

import type { Response } from "express";

export class AuthService {
    private readonly ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    private readonly REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    // ======================================================
    // COOKIE HELPERS
    // ======================================================

    private getCookieOptions(expiresIn: number) {
        return {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as const,
            maxAge: expiresIn * 1000,
        };
    }

    public setAuthCookies(
        res: Response,
        accessToken: string,
        refreshToken: string
    ) {
        // 1 day
        res.cookie(
            this.ACCESS_TOKEN_COOKIE_NAME,
            accessToken,
            this.getCookieOptions(60 * 60 * 24)
        );

        // 7 days
        res.cookie(
            this.REFRESH_TOKEN_COOKIE_NAME,
            refreshToken,
            this.getCookieOptions(60 * 60 * 24 * 7)
        );
    }

    public clearAuthCookies(res: Response) {
        res.clearCookie(this.ACCESS_TOKEN_COOKIE_NAME);
        res.clearCookie(this.REFRESH_TOKEN_COOKIE_NAME);
    }

    // ======================================================
    // USER HELPERS
    // ======================================================

    private async findUserByEmail(email: string) {
        const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        return users.length > 0 ? users[0] : null;
    }

    private hashPassword(password: string, salt: string) {
        return crypto
            .createHash("sha256")
            .update(password + salt)
            .digest("hex");
    }

    // ======================================================
    // REGISTER
    // ======================================================

    public async registerUserWithEmailAndPassword(
        payload: RegisterUserWithEmailAndPasswordInputType
    ) {
        try {
            const { full_name, email, password } =
                await registerUserWithEmailAndPasswordInput.parseAsync(payload);

            const existingUser = await this.findUserByEmail(email);

            if (existingUser) {
                throw new Error("User already exists");
            }

            const salt = crypto.randomBytes(16).toString("hex");

            const hash = this.hashPassword(password, salt);

            const insertedUsers = await db
                .insert(usersTable)
                .values({
                    full_name,
                    email,
                    password_salt: salt,
                    password_hash: hash,
                })
                .returning({
                    id: usersTable.id,
                    full_name: usersTable.full_name,
                    email: usersTable.email,
                    created_at: usersTable.created_at,
                });

            if (!insertedUsers[0]) {
                throw new Error("Failed to create user");
            }

            const user = insertedUsers[0];

            const accessToken = generateAccessToken(user.id);

            const refreshToken = generateRefreshToken(user.id);

            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.error("REGISTER ERROR:", error);
            throw error;
        }
    }

    // ======================================================
    // LOGIN
    // ======================================================

    public async loginUserWithEmailAndPassword(
        payload: LoginUserWithEmailAndPasswordInputType
    ) {
        try {
            const { email, password } =
                await loginUserWithEmailAndPasswordInput.parseAsync(payload);

            const user = await this.findUserByEmail(email);

            if (!user) {
                throw new Error("Invalid email or password");
            }

            const hash = this.hashPassword(
                password,
                user.password_salt!
            );

            if (hash !== user.password_hash) {
                throw new Error("Invalid email or password");
            }

            const accessToken = generateAccessToken(user.id);

            const refreshToken = generateRefreshToken(user.id);

            return {
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    created_at: user.created_at,
                },
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.error("LOGIN ERROR:", error);
            throw error;
        }
    }

    // ======================================================
    // GET USER
    // ======================================================

    public async getUserById(userId: string) {
        try {
            const users = await db
                .select({
                    id: usersTable.id,
                    full_name: usersTable.full_name,
                    email: usersTable.email,
                    created_at: usersTable.created_at,
                })
                .from(usersTable)
                .where(eq(usersTable.id, userId));

            return users.length > 0 ? users[0] : null;
        } catch (error) {
            console.error("GET USER ERROR:", error);
            throw error;
        }
    }

    // ======================================================
    // REFRESH TOKEN
    // ======================================================

    public async refreshAccessToken(refreshToken: string) {
        try {
            const decoded = verifyRefreshToken(refreshToken);

            if (!decoded) {
                throw new Error("Invalid refresh token");
            }

            const user = await this.getUserById(decoded.userId);

            if (!user) {
                throw new Error("User not found");
            }

            const newAccessToken = generateAccessToken(user.id);

            const newRefreshToken = generateRefreshToken(user.id);

            return {
                user,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            console.error("REFRESH TOKEN ERROR:", error);
            throw error;
        }
    }

    // ======================================================
    // LOGOUT
    // ======================================================

    public async logoutUser(res: Response) {
        this.clearAuthCookies(res);

        return {
            success: true,
            message: "Logged out successfully",
        };
    }
}

export const authService = new AuthService();
