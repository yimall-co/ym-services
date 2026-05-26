import { DomainError } from 'shared/domain/domain-error';

export class ProfileInvalidBirthdate extends DomainError {
    constructor() {
        super('Profile birthdate must be at least 16 years old', 'PROFILE_INVALID_BIRTHDATE');
    }
}
