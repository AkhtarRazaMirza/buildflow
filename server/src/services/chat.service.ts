import { asc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { chatsTable } from "../db/schema.js";
import { chatHistoryMessageSchema, type ChatHistoryMessage } from "../type/chat.type.js";

export class ChatService {
    public async saveUserMessage(projectId: string, content: string) {
        const savedMessages = await db
            .insert(chatsTable)
            .values({
                project_id: projectId,
                role: "user",
                content,
            })
            .returning();

        return savedMessages[0] ?? null;
    }

    public async saveAssistantMessage(projectId: string, content: string) {
        const savedMessages = await db
            .insert(chatsTable)
            .values({
                project_id: projectId,
                role: "assistant",
                content,
            })
            .returning();

        return savedMessages[0] ?? null;
    }

    public async getProjectHistory(projectId: string): Promise<ChatHistoryMessage[]> {
        const messages = await db
            .select({
                role: chatsTable.role,
                content: chatsTable.content,
            })
            .from(chatsTable)
            .where(eq(chatsTable.project_id, projectId))
            .orderBy(asc(chatsTable.created_at));

        return messages.flatMap((message) => {
            const result = chatHistoryMessageSchema.safeParse({
                role: message.role,
                content: message.content,
            });

            return result.success ? [result.data] : [];
        });
    }

    public async getMessages(
        projectId: string
    ) {
        return db
            .select()
            .from(chatsTable)
            .where(
                eq(chatsTable.project_id, projectId)
            )
            .orderBy(
                asc(chatsTable.created_at)
            );
    }
}

export const chatService = new ChatService();
