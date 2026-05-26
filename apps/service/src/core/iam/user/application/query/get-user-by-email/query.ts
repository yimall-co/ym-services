import { Query } from 'shared/domain/query';

export class GetUserByEmailQuery extends Query {
    readonly email: string;

    constructor(email: string) {
        super();

        this.email = email;
    }
}
