import OpenAI from "openai";
import { LlmProviders, LLM_CONFIGURATIONS } from "../configuration/llm-configurations";
import { OllamaModels } from "../configuration/llm-models";

class OllamaClient implements LlmClient {
    private client: OpenAI;
    private model: string = OllamaModels.QWEN_2_5_CODER_14B;

    constructor() {
        this.client = new OpenAI(
            LLM_CONFIGURATIONS[LlmProviders.OLLAMA]
        );
    }

    async createCompletion(
        prompt: string
    ): Promise<{
        role: string;
        content: string;
    }> {
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