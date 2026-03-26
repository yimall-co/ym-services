import { Query } from 'shared/domain/query';

export class GetUserInfoByIdQuery extends Query {
    readonly userId: string;

    constructor(userId: string) {
        super();

        this.userId = userId;
    }
}
