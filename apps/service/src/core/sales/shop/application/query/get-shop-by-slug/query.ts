import { Query } from 'shared/domain/query';

export class GetShopBySlugQuery extends Query {
    readonly slug: string;
    readonly workspace: string | null;

    constructor(slug: string, workspace: string | null = null) {
        super();

        this.slug = slug;
        this.workspace = workspace;
    }
}
