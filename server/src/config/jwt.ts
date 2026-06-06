import jwt from "jsonwebtoken";
import type { JwtPayload, SignOptions } from "jsonwebtoken";

interface TokenPayload {
    userId: string;
}

export function generateAccessToken(userId: string) {
    const secret = process.env.ACCESS_TOKEN_SECRET!;

    const options: SignOptions = {
        expiresIn: "1d",
    };

    return jwt.sign(
        { userId }, // ✅ object payload
        secret,
        options
    );
}

export function generateRefreshToken(userId: string) {
    const secret = process.env.REFRESH_TOKEN_SECRET!;

    const options: SignOptions = {
        expiresIn: "7d",
    };

    return jwt.sign(
        { userId }, // ✅ object payload
        secret,
        options
    );
}

export function verifyAccessToken(token: string) {
    try {
        return jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload & TokenPayload;
    } catch {
        return null;
    }
}

export function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET!
        ) as JwtPayload & TokenPayload;
    } catch {
        return null;
    }
}