import { DomainError } from "shared/domain/domain-error";

export class RoleNotFound extends DomainError {
    constructor() {
        super('Role not found', 'ROLE_NOT_FOUND');
    }
}