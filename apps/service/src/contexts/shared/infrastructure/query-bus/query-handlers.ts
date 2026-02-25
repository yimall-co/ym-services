import { Query } from 'shared/domain/query';
import { Response } from 'shared/domain/response';
import { QueryHandler } from 'shared/domain/query-handler';

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
    constructor(private readonly handlers: Array<QueryHandler<Query, Response>>) {
        super();

        this.handlers.forEach((handler) => {
            this.set(handler.subscribedTo(), handler);
        });
    }

    public get(query: Query): QueryHandler<Query, Response> {
        const queryHandler = super.get(query.constructor);
        if (!queryHandler) {
            throw new Error('Query handler not found');
        }

        return queryHandler;
    }
}
