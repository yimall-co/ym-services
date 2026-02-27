import { Query } from 'shared/domain/query';

export class GetWorkspacesQuery extends Query {
    readonly top: number;
    readonly skip: number;

    constructor(top: number, skip: number) {
        super();

        this.top = top;
        this.skip = skip;
    }
}