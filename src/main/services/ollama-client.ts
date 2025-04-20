import OpenAI from "openai";
import { LlmProviders, LLM_CONFIGURATIONS } from "../configuration/llm-configurations";
import { LlmClient } from "./llm_client";

class OllamaClient implements LlmClient {
    private client: OpenAI;
    private model: string | null = null;
    private models: string[] | null = null;

    constructor() {
        this.client = new OpenAI(
            LLM_CONFIGURATIONS[LlmProviders.OLLAMA]
        );
    }

    async getModels(): Promise<string[]> {
        try {
            const response = await this.client.models.list();
            return response.data.map((model) => model.id)
        } catch (error) {
            console.error('Error fetching models:', error);
            throw error;
        }
    }

    getModel(): string | null {
        return this.model;
    }

    async setModel(model: string) {
        this.models = await this.getModels();
        if (!this.models?.includes(model)) {
            throw new Error(`Model ${model} not found`);
        }
        this.model = model;
    }

    async createCompletion(
        prompt: string
    ): Promise<{
        role: string;
        content: string;
    }> {
        if (!this.model) {
            throw new Error("Model not set. Call setModel first.");
        }
        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                stream: false
            });
            return {
                role: response.choices[0].message.role,
                content: response.choices[0].message.content || ''
            };
        } catch (error) {
            console.error('Error creating completion:', error);
            throw error;
        }
    }
}

export default OllamaClient;