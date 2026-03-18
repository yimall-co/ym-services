import { Query } from 'shared/domain/query';

export class GetOfferBySlugQuery extends Query {
    readonly slug: string;

    constructor(slug: string) {
        super();

        this.slug = slug;
    }
}
