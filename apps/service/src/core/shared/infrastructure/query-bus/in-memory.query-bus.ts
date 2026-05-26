import { Query } from 'shared/domain/query';
import { Response } from 'shared/domain/response';
import { QueryBus } from 'shared/domain/query-bus';

import { QueryHandlers } from './query-handlers';

export class InMemoryQueryBus implements QueryBus {
    constructor(private readonly queryHandlers: QueryHandlers) { }

    async ask<R extends Response>(query: Query): Promise<R> {
        const queryHandler = this.queryHandlers.get(query);
        if (!queryHandler) {
            throw new Error('Query handler not found');
        }

        return (await queryHandler.handle(query)) as unknown as Promise<R>;
    }
}
