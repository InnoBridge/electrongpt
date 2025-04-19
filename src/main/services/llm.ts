import OllamaClient from "./ollama-client";

// Configure the OpenAI client to use Ollama
const createLlmClient = (): LlmClient => {
    return new OllamaClient();
};

export {
    createLlmClient
};