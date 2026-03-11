import { Query } from 'shared/domain/query';

export class GetUserByIdQuery extends Query {
    readonly id: string;

    constructor(id: string) {
        super();

        this.id = id;
    }
}
