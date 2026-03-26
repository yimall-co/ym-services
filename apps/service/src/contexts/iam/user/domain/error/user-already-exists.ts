import { DomainError } from 'shared/domain/domain-error';

export class UserAlreadyExists extends DomainError {
    constructor() {
        super('User already exists', 'USER_ALREADY_EXISTS');
    }
}
