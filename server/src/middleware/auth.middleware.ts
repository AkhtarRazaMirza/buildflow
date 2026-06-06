import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken as verifyAccessTokenJWT, verifyRefreshToken as verifyRefreshTokenJWT } from '../config/jwt.js';

export interface AuthRequest extends Request {
    userId?: string;
}

export function verifyAccessToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            res.status(401).json({ error: 'No access token provided' });
            return;
        }

        const decoded = verifyAccessTokenJWT(token);
        if (!decoded) {
            res.status(401).json({ error: 'Invalid or expired access token' });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export function verifyRefreshTokenMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.status(401).json({ error: 'No refresh token provided' });
            return;
        }

        const decoded = verifyRefreshTokenJWT(token);
        if (!decoded) {
            res.status(401).json({ error: 'Invalid or expired refresh token' });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
