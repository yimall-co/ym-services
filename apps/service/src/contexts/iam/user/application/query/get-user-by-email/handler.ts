import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { UserByEmailDto } from './dto';
import { GetUserByEmailQuery } from './query';
import { UserRepositoryScope } from '../../user.repository-scope';

export class GetUserByEmailQueryHandler implements QueryHandler<
    GetUserByEmailQuery,
    UserByEmailDto | null
> {
    constructor(private readonly uow: UnitOfWork<UserRepositoryScope>) { }

    subscribedTo(): Query {
        return GetUserByEmailQuery;
    }

    async handle(query: GetUserByEmailQuery): Promise<UserByEmailDto | null> {
        const { email } = query;

        return this.uow.withTransaction(async (scope) => {
            const userQueryRepository = scope.getUserQueryRepository();

            const userByEmail = await userQueryRepository.findByEmail(email);
            return userByEmail;
        });
    }
}
