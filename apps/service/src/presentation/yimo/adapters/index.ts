import { Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { createDeepAgent } from 'deepagents';

import { createOpenRouterChatModel } from 'lib/yimo';

import { AGENT, MODEL } from './constants';

export const modelProvider: Provider = {
    provide: MODEL,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const model = createOpenRouterChatModel({
            model: 'nvidia/nemotron-3-super-120b-a12b:free',
            apiKey: configService.getOrThrow<string>('agent.openRouterApiKey'),
        });
        return model;
    },
    scope: Scope.DEFAULT,
};

export const agentProvider: Provider = {
    provide: AGENT,
    inject: [MODEL],
    useFactory: (model: BaseChatModel) => {
        const agent = createDeepAgent({
            model,
        });

        return agent;
    },
    scope: Scope.DEFAULT,
};
