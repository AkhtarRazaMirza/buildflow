import { z } from 'zod';

export const registerUserWithEmailAndPasswordInput = z.object({
    full_name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8),
});

export type RegisterUserWithEmailAndPasswordInputType = z.infer<typeof registerUserWithEmailAndPasswordInput>;


export const loginUserWithEmailAndPasswordInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type LoginUserWithEmailAndPasswordInputType = z.infer<typeof loginUserWithEmailAndPasswordInput>;