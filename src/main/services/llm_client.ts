interface LlmClient {
    createCompletion(promtp: string): Promise<{
        role: string;
        content: string;
    }>;
}