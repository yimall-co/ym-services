import { ChatAnthropic } from '@langchain/anthropic';

const haiku = new ChatAnthropic({
    model: 'claude-3-5-haiku-latest',
    maxTokens: 10000,
});

const sonnet = new ChatAnthropic({
    model: 'claude-sonnet-4-5',
    maxTokens: 10000,
});

export { haiku, sonnet };
