import { DomainError } from 'shared/domain/domain-error';

export class UserNotFound extends DomainError {
    constructor() {
        super('User not found, inactive or removed', 'USER_NOT_FOUND');
    }
}
