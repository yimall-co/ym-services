import { DomainError } from 'shared/domain/domain-error';

export class ShopSlugAlreadyExists extends DomainError {
    constructor(slug: string) {
        super(`Shop with slug ${slug} already exists`, 'SHOP_SLUG_ALREADY_EXISTS');
    }
}
