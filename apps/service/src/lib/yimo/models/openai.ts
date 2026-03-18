import { ChatOpenAI } from '@langchain/openai';

export function createOpenAiChatModel(apiKey: string, model: ChatOpenAI['model']) {
    return new ChatOpenAI({
        model,
        apiKey,
        maxTokens: 10000,
    });
}
