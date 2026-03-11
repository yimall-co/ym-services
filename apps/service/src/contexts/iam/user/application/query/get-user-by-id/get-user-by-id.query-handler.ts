import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { UserByIdDto } from './get-user-by-id.dto';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { UserQueryRepository } from '../user-query.repository';

export class GetUserByIdQueryHandler implements QueryHandler<GetUserByIdQuery, UserByIdDto> {
    constructor(private readonly userQueryRepository: UserQueryRepository) { }

    subscribedTo(): Query {
        return GetUserByIdQuery;
    }

    async handle(query: GetUserByIdQuery): Promise<UserByIdDto> {
        const userById = await this.userQueryRepository.findById(query.id);
        if (!userById) {
            throw new Error('User not found');
        }

        return userById;
    }
}
