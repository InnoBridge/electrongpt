enum LlmProviders {
    OLLAMA = 'ollama',
    OPENAI = 'openai'
}

const LLM_CONFIGURATIONS = {
    [LlmProviders.OLLAMA]: {
        baseURL: `${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/v1`,
        apiKey: process.env.OLLAMA_API_KEY || 'ollama',
        organization: process.env.OLLAMA_ORGANIZATION || LlmProviders.OLLAMA
    },
    [LlmProviders.OPENAI]: {
        apiKey: process.env.OPEN_API_KEY || '',
        organization: process.env.OPENAI_ORGANIZATION || LlmProviders.OPENAI
    }
};

export {
    LLM_CONFIGURATIONS,
    LlmProviders
}