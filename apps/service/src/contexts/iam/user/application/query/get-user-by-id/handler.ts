import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { UserByIdDto } from './dto';
import { GetUserByIdQuery } from './query';
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
