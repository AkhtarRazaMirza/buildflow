import { checkGROQAi } from "../config/ai.config.js";
import { projectService } from "./project.service.js";
import { TaskService } from "./task.service.js";
import { activityService } from "./activity.service.js";
import { type ChatHistoryMessage } from "../type/chat.type.js";
import {
    projectMemorySchema,
    saveProjectMemoryInputSchema,
    type ProjectMemory,
} from "../type/project.type.js";
import { createTaskInputSchema } from "../type/task.type.js";
import type {
    ChatCompletionAssistantMessageParam,
    ChatCompletionMessageParam,
    ChatCompletionMessageToolCall,
    ChatCompletionTool,
} from "groq-sdk/resources/chat/completions";
import { z } from "zod";
import { searchWeb } from "./search.service.js";

const taskService = new TaskService();

interface ProjectContext {
    id: string;
    name: string;
    description: string | null;
    project_summary: string | null;
    goals: unknown;
    features: unknown;
    timeline: unknown;
    risks: unknown;
    tech_stack: unknown;
}

interface AgentToolResult {
    tool: string;
    result: unknown;
    activity?: {
        id: string;
        created_at: Date;
    };
}

export interface AgentResponse {
    assistantMessage: string;
    projectMemory: ProjectMemory | null;
    projectMemorySaved: boolean;
    toolResults: AgentToolResult[];
}

const searchWebInputSchema = z.object({
    query: z.string().trim().min(1).max(300),
});

const TOOL_DEFINITIONS: ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "createTask",
            description: "Create one actionable task in the current project. Call this once per task.",
            parameters: {
                type: "object",
                properties: {
                    projectId: {
                        type: "string",
                        description: "The active project id.",
                    },
                    title: {
                        type: "string",
                        description: "The task title.",
                    },
                    description: {
                        type: "string",
                        description: "Optional task description.",
                    },
                    status: {
                        type: "string",
                        description: "Optional task status, for example todo.",
                    },
                },
                required: ["projectId", "title"],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "saveProjectMemory",
            description: "Save the current project summary, goals, features, timeline, risks, and tech stack.",
            parameters: {
                type: "object",
                properties: {
                    projectId: {
                        type: "string",
                        description: "The active project id.",
                    },
                    projectSummary: {
                        type: "string",
                        description: "Short project summary.",
                    },
                    goals: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    features: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    timeline: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    risks: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    techStack: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
                required: [
                    "projectId",
                    "projectSummary",
                    "goals",
                    "features",
                    "timeline",
                    "risks",
                    "techStack",
                ],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "searchWeb",
            description: "Return simple external context when the answer needs outside information.",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The web search query.",
                    },
                },
                required: ["query"],
                additionalProperties: false,
            },
        },
    },
];

const SYSTEM_PROMPT = `
You are ProjectPilot, an AI project manager for a real SaaS-style product.

Use tools whenever they help you complete the job.

Available tools:
- createTask: create one actionable task at a time. Use it multiple times when the user asks for a task list or roadmap.
- saveProjectMemory: persist the current project summary, goals, features, timeline, risks, and tech stack.
- searchWeb: fetch simple external context when you need up-to-date or outside information.

Workflow:
1. Read the project context and chat history.
2. Decide whether a tool should be used.
3. Execute the needed tools.
4. Give a short, practical final response after tool execution.

Rules:
- Prefer tools over text when a tool can do the job.
- For planning requests, create small actionable tasks instead of one giant task.
- For planning and roadmap requests, call saveProjectMemory after you settle the plan.
- Use saveProjectMemory when the project understanding changes.
- Use searchWeb only for external information.
- Do not invent tool results.
- Keep the final answer concise and useful.
`;

function cleanJsonContent(content: string) {
    const trimmedContent = content.trim();
    const fencedMatch = trimmedContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

    if (fencedMatch?.[1]) {
        return fencedMatch[1].trim();
    }

    const startIndex = trimmedContent.indexOf("{");
    const endIndex = trimmedContent.lastIndexOf("}");

    if (startIndex >= 0 && endIndex > startIndex) {
        return trimmedContent.slice(startIndex, endIndex + 1);
    }

    return trimmedContent;
}

function formatValue(value: unknown) {
    if (typeof value === "string") {
        return value;
    }

    if (value === null || value === undefined) {
        return "[]";
    }

    return JSON.stringify(value);
}

export class AIService {
    private readonly model = "openai/gpt-oss-120b";

    private parseProjectMemory(content: string): ProjectMemory | null {
        try {
            const cleanedContent = cleanJsonContent(content);
            const parsedContent = JSON.parse(cleanedContent);
            const result = projectMemorySchema.safeParse(parsedContent);

            if (!result.success) {
                return null;
            }

            return result.data;
        } catch {
            return null;
        }
    }

    private buildProjectContextMessage(project: ProjectContext) {
        return [
            `Active project id: ${project.id}`,
            `Name: ${project.name}`,
            `Description: ${project.description || "N/A"}`,
            `Stored project summary: ${project.project_summary || "N/A"}`,
            `Stored goals: ${formatValue(project.goals)}`,
            `Stored features: ${formatValue(project.features)}`,
            `Stored timeline: ${formatValue(project.timeline)}`,
            `Stored risks: ${formatValue(project.risks)}`,
            `Stored tech stack: ${formatValue(project.tech_stack)}`,
        ].join("\n");
    }

    private toConversationMessages(history: ChatHistoryMessage[], message: string) {
        const messages: ChatCompletionMessageParam[] = history.map((item) => ({
            role: item.role,
            content: item.content,
        }));

        messages.push({
            role: "user",
            content: message,
        });

        return messages;
    }

    private parseToolArguments(rawArguments: string) {
        try {
            return JSON.parse(rawArguments);
        } catch {
            return null;
        }
    }

    private async searchWeb(query: string) {
        return await searchWeb(query);
    }

    private async executeToolCall(
        toolCall: ChatCompletionMessageToolCall,
        projectId: string,
    ): Promise<{
        result: unknown;
        projectMemory: ProjectMemory | null;
        activity?: {
            id: string;
            created_at: Date;
        };
    }> {
        const rawArguments = this.parseToolArguments(toolCall.function.arguments);

        if (!rawArguments) {
            await activityService.createActivity({
                projectId,
                toolName: toolCall.function.name,
                arguments: {},
                status: "failed",
                errorMessage: `Invalid JSON arguments for ${toolCall.function.name}.`,
            });
            return {
                result: {
                    error: `Invalid JSON arguments for ${toolCall.function.name}.`,
                },
                projectMemory: null,
            };
        }

        if (toolCall.function.name === "createTask") {
            const validatedInput = createTaskInputSchema.safeParse({
                ...rawArguments,
                projectId,
            });

            if (!validatedInput.success) {
                await activityService.createActivity({
                    projectId,
                    toolName: "createTask",
                    arguments: rawArguments,
                    status: "failed",
                    errorMessage: "Invalid createTask arguments.",
                });
                return {
                    result: {
                        error: "Invalid createTask arguments.",
                        issues: validatedInput.error.flatten(),
                    },
                    projectMemory: null,
                };
            }

            const task = await taskService.createTask({
                project_id: validatedInput.data.projectId,
                title: validatedInput.data.title,
                description: validatedInput.data.description,
                status: validatedInput.data.status,
            });

            await activityService.createActivity({
                projectId,
                toolName: "createTask",
                arguments: rawArguments,
                result: { task },
                status: "success",
            });

            return {
                result: {
                    task,
                },
                projectMemory: null,
            };
        }

        if (toolCall.function.name === "saveProjectMemory") {
            const validatedInput = saveProjectMemoryInputSchema.safeParse({
                ...rawArguments,
                projectId,
            });

            if (!validatedInput.success) {
                await activityService.createActivity({
                    projectId,
                    toolName: "saveProjectMemory",
                    arguments: rawArguments,
                    status: "failed",
                    errorMessage: "Invalid saveProjectMemory arguments.",
                });
                return {
                    result: {
                        error: "Invalid saveProjectMemory arguments.",
                        issues: validatedInput.error.flatten(),
                    },
                    projectMemory: null,
                };
            }

            const { projectId: _, ...memory } = validatedInput.data;
            const updatedProject = await projectService.updateProjectMemory(projectId, memory);

            await activityService.createActivity({
                projectId,
                toolName: "saveProjectMemory",
                arguments: rawArguments,
                result: { project: updatedProject },
                status: "success",
            });

            return {
                result: {
                    project: updatedProject,
                },
                projectMemory: memory,
            };
        }

        if (toolCall.function.name === "searchWeb") {
            const validatedInput = searchWebInputSchema.safeParse(rawArguments);

            if (!validatedInput.success) {
                await activityService.createActivity({
                    projectId,
                    toolName: "searchWeb",
                    arguments: rawArguments,
                    status: "failed",
                    errorMessage: "Invalid searchWeb arguments.",
                });
                return {
                    result: {
                        error: "Invalid searchWeb arguments.",
                        issues: validatedInput.error.flatten(),
                    },
                    projectMemory: null,
                };
            }

            const searchResults = await this.searchWeb(validatedInput.data.query);

            await activityService.createActivity({
                projectId,
                toolName: "searchWeb",
                arguments: rawArguments,
                result: { searchResults },
                status: "success",
            });

            return {
                result: { searchResults },
                projectMemory: null,
            };
        }

        await activityService.createActivity({
            projectId,
            toolName: toolCall.function.name,
            arguments: rawArguments,
            status: "failed",
            errorMessage: `Unknown tool: ${toolCall.function.name}`,
        });

        return {
            result: {
                error: `Unknown tool: ${toolCall.function.name}`,
            },
            projectMemory: null,
        };
    }

    public async generateProjectResponse(
        project: ProjectContext,
        history: ChatHistoryMessage[],
        message: string,
    ): Promise<AgentResponse> {
        const client = await checkGROQAi();
        const messages = [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "system",
                content: this.buildProjectContextMessage(project),
            },
            ...this.toConversationMessages(history, message),
        ] as ChatCompletionMessageParam[];

        const toolResults: AgentToolResult[] = [];
        let projectMemory: ProjectMemory | null = null;
        let projectMemorySaved = false;

        for (let round = 0; round < 10; round += 1) {
            const response = await client.chat.completions.create({
                model: this.model,
                messages,
                tools: TOOL_DEFINITIONS,
                tool_choice: "auto",
                parallel_tool_calls: false,
                temperature: 0.2,
            });

            const assistantMessage = response.choices[0]?.message;

            if (!assistantMessage) {
                throw new Error("AI did not return a response.");
            }

            const toolCalls = assistantMessage.tool_calls ?? [];

            if (toolCalls.length === 0) {
                const finalContent = assistantMessage.content?.trim() ?? "";

                if (finalContent) {
                    const parsedMemory = this.parseProjectMemory(finalContent);

                    if (parsedMemory && !projectMemorySaved) {
                        projectMemory = parsedMemory;
                    }

                    return {
                        assistantMessage: finalContent,
                        projectMemory,
                        projectMemorySaved,
                        toolResults,
                    };
                }

                break;
            }

            messages.push({
                role: "assistant",
                content: assistantMessage.content?.trim() ? assistantMessage.content : null,
                tool_calls: toolCalls,
            } satisfies ChatCompletionAssistantMessageParam);

            for (const toolCall of toolCalls) {
                const execution = await this.executeToolCall(toolCall, project.id);

                toolResults.push({
                    tool: toolCall.function.name,
                    result: execution.result,
                });

                if (execution.projectMemory) {
                    projectMemory = execution.projectMemory;
                    projectMemorySaved = true;
                }

                messages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(execution.result),
                });
            }
        }

        const finalResponse = await client.chat.completions.create({
            model: this.model,
            messages,
            tools: TOOL_DEFINITIONS,
            tool_choice: "none",
            temperature: 0.2,
        });

        const finalAssistantMessage = finalResponse.choices[0]?.message.content?.trim() ?? "";

        if (!finalAssistantMessage) {
            throw new Error("AI did not return a response.");
        }

        const parsedMemory = this.parseProjectMemory(finalAssistantMessage);

        if (parsedMemory && !projectMemorySaved) {
            projectMemory = parsedMemory;
        }

        return {
            assistantMessage: finalAssistantMessage,
            projectMemory,
            projectMemorySaved,
            toolResults,
        };
    }
}

export const aiService = new AIService();
