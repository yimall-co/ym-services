import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { UserInfoByIdDto } from './dto';
import { GetUserInfoByIdQuery } from './query';
import { UserQueryRepository } from '../user-query.repository';

export class GetUserInfoByIdQueryHandler implements QueryHandler<
    GetUserInfoByIdQuery,
    UserInfoByIdDto
> {
    constructor(private readonly userQueryRepository: UserQueryRepository) { }

    subscribedTo(): Query {
        return GetUserInfoByIdQuery;
    }

    async handle(query: GetUserInfoByIdQuery): Promise<UserInfoByIdDto> {
        const result = await this.userQueryRepository.findInfoById(query.userId);
        return result;
    }
}
