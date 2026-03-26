import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { UserByIdDto } from './dto';
import { GetUserByIdQuery } from './query';
import { UserRepositoryScope } from '../../user.repository-scope';

export class GetUserByIdQueryHandler implements QueryHandler<GetUserByIdQuery, UserByIdDto> {
    constructor(private readonly uow: UnitOfWork<UserRepositoryScope>) { }

    subscribedTo(): Query {
        return GetUserByIdQuery;
    }

    async handle(query: GetUserByIdQuery): Promise<UserByIdDto> {
        return this.uow.withTransaction(async (scope) => {
            const userQueryRepository = scope.getUserQueryRepository();

            return await userQueryRepository.findById(query.id);
        });
    }
}
