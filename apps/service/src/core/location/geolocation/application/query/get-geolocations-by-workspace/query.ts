import { Query } from 'shared/domain/query';

export class GetGeolocationsByWorkspaceQuery extends Query {
    readonly workspaceId: string;

    constructor(workspaceId: string) {
        super();

        this.workspaceId = workspaceId;
    }
}
