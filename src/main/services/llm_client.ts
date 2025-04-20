export interface LlmClient {
    getModels(): Promise<string[]>;
    getModel(): string | null;
    setModel(model: string): Promise<void>;
    createCompletion(prompt: string): Promise<{
        role: string;
        content: string;
    }>;
}