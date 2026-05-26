import { DomainError } from 'shared/domain/domain-error';

export class CategoryAlreadyExists extends DomainError {
    constructor() {
        super('Category already exists', 'CATEGORY_ALREADY_EXISTS');
    }
}
