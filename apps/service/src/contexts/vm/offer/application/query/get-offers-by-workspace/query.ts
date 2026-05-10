import { Query } from 'shared/domain/query';

export class GetOffersByWorkspaceQuery extends Query {
    readonly workspaceId: string;
    readonly limit: number;
    readonly updatedAt: Date;
    readonly id: string;

    constructor(workspaceId: string, limit: number, updatedAt: Date, id: string) {
        super();

        this.workspaceId = workspaceId;
        this.limit = limit;
        this.updatedAt = updatedAt;
        this.id = id;
    }
}
