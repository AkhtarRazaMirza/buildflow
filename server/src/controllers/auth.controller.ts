import { AuthService } from '../services/auth.service.js';
import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware.js';

const authService = new AuthService();

export class AuthController {
    public async registerUserWithEmailAndPassword(req: Request, res: Response) {
        try {
            const result = await authService.registerUserWithEmailAndPassword(req.body);
            
            // Set secure HTTP-only cookies
            authService.setAuthCookies(res, result.accessToken, result.refreshToken);
            
            // Return user data without tokens (they're in cookies now)
            res.status(201).json({
                result
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }    
    }

    public async loginUserWithEmailAndPassword(req: Request, res: Response) {
        try {
            const result = await authService.loginUserWithEmailAndPassword(req.body);
            
            // Set secure HTTP-only cookies
            authService.setAuthCookies(res, result.accessToken, result.refreshToken);
            
            // Return user data without tokens (they're in cookies now)
            res.status(200).json({
                result
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async logout(req: AuthRequest, res: Response) {
        try {
            await authService.logoutUser(res);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async getCurrentUser(req: AuthRequest, res: Response) {
        try {
            if (!req.userId) {
                res.status(401).json({ error: 'User ID not found in token' });
                return;
            }

            const user = await authService.getUserById(req.userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.status(200).json({
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    created_at: user.created_at,
                }
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public async refreshToken(req: AuthRequest, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                res.status(401).json({ error: 'No refresh token provided' });
                return;
            }

            const result = await authService.refreshAccessToken(refreshToken);
            
            // Set new access token cookie
            authService.setAuthCookies(res, result.accessToken, result.refreshToken);
            
            res.status(200).json({ message: 'Token refreshed successfully' });
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    }
}