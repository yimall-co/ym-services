import { Query } from 'shared/domain/query';

export class GetWorkspacesQuery extends Query {
    readonly id?: string;
    readonly updatedAt?: Date;
    readonly limit?: number;

    constructor(id?: string, updatedAt?: Date, limit?: number) {
        super();

        this.id = id;
        this.updatedAt = updatedAt;
        this.limit = limit;
    }
}
