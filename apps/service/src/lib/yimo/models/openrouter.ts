import { ChatOpenRouter } from '@langchain/openrouter';

type OpenRouterParams = Readonly<{
    apiKey: string;
    model: string;
    maxTokens?: number;
}>;

export function createOpenRouterChatModel(params: OpenRouterParams) {
    const { model, apiKey, maxTokens = 1024 } = params;

    return new ChatOpenRouter({
        model,
        apiKey,
        maxTokens,
    });
}
