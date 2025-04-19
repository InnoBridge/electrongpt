import OllamaClient from "./ollama-client";
import { LlmClient } from "./llm_client";

let llmClient: LlmClient | null = null;

// Configure the OpenAI client to use Ollama
const createLlmClient = () => {
    llmClient = new OllamaClient();
};

const createCompletion = async (prompt: string): Promise<{
    role: string;
    content: string;
}> => {
    if (!llmClient) {
        throw new Error("LLM client not initialized. Call createLlmClient first.");
    }
    return await llmClient.createCompletion(prompt);
};

export {
    createLlmClient,
    createCompletion
};