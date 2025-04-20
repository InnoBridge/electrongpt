import OllamaClient from "./ollama-client";
import { LlmClient } from "./llm_client";

let llmClient: LlmClient | null = null;

// Configure the OpenAI client to use Ollama
const createLlmClient = () => {
    llmClient = new OllamaClient();
    let models = llmClient.getModels();
    if (!models) {
        throw new Error("Failed to fetch models");
    }
};

const getModels = async (): Promise<string[]> => {
    if (!llmClient) {
        throw new Error("LLM client not initialized. Call createLlmClient first.");
    }
    return await llmClient.getModels();
}

const getModel = (): string | null => {
    if (!llmClient) {
        throw new Error("LLM client not initialized. Call createLlmClient first.");
    }
    return llmClient.getModel();
}

const setModel = async (model: string): Promise<void> => {
    if (!llmClient) {
        throw new Error("LLM client not initialized. Call createLlmClient first.");
    }
    await llmClient.setModel(model);
}


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
    getModels,
    getModel,
    setModel,
    createCompletion
};