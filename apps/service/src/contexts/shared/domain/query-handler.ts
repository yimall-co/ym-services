import { Query } from './query';
import { Response } from './response';

export interface QueryHandler<TQuery extends Query, TResponse extends Response | null> {
    subscribedTo(): Query;
    handle(query: TQuery): Promise<TResponse>;
}
