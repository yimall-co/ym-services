import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { UserByEmailDto } from './get-user-by-email.dto';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserQueryRepository } from '../user-query.repository';

export class GetUserByEmailQueryHandler implements QueryHandler<GetUserByEmailQuery, UserByEmailDto | null> {
    constructor(private readonly userQueryRepository: UserQueryRepository) { }

    subscribedTo(): Query {
        return GetUserByEmailQuery;
    }

    async handle(query: GetUserByEmailQuery): Promise<UserByEmailDto | null> {
        const { email } = query;

        const userByEmail = await this.userQueryRepository.findByEmail(email);
        return userByEmail;
    }
}
