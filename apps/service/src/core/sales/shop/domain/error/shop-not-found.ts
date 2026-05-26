import { DomainError } from 'shared/domain/domain-error';

export class ShopNotFound extends DomainError {
    constructor() {
        super(`Shop/s not found`, 'SHOP_NOT_FOUND');
    }
}
