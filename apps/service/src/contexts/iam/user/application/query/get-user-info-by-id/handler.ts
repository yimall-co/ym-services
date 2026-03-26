import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { UserInfoByIdDto } from './dto';
import { GetUserInfoByIdQuery } from './query';
import { UserRepositoryScope } from '../../user.repository-scope';

export class GetUserInfoByIdQueryHandler implements QueryHandler<
    GetUserInfoByIdQuery,
    UserInfoByIdDto
> {
    constructor(private readonly uow: UnitOfWork<UserRepositoryScope>) { }

    subscribedTo(): Query {
        return GetUserInfoByIdQuery;
    }

    async handle(query: GetUserInfoByIdQuery): Promise<UserInfoByIdDto> {
        const userId = query.userId;

        return this.uow.withTransaction(async (scope) => {
            const userQueryRepository = scope.getUserQueryRepository();
            return await userQueryRepository.findInfoById(userId);
        });
    }
}
