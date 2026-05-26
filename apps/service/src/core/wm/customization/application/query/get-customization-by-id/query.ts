import { Query } from 'shared/domain/query';

export class GetCustomizationByIdQuery extends Query {
    readonly id: string;

    constructor(id: string) {
        super();

        this.id = id;
    }
}
