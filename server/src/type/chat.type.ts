import { z } from "zod";

export const chatMessageInputSchema = z.object({
    project_id: z.string().uuid(),
    message: z.string().trim().min(1).max(10000),
});

export type ChatMessageInput = z.infer<typeof chatMessageInputSchema>;

export const chatHistoryMessageSchema = z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
});

export type ChatHistoryMessage = z.infer<typeof chatHistoryMessageSchema>;
