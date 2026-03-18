import { Query } from 'shared/domain/query';

export class GetWorkspaceByIdQuery extends Query {
    readonly id: string;

    constructor(id: string) {
        super();

        this.id = id;
    }
}
