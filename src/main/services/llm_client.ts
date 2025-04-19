export interface LlmClient {
    createCompletion(prompt: string): Promise<{
        role: string;
        content: string;
    }>;
}