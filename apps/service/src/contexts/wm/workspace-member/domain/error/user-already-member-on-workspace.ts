import { DomainError } from "shared/domain/domain-error";

export class UserAlreadyMemberOnWorkspace extends DomainError {

    constructor() {
        super('User is already a member of the workspace', 'USER_ALREADY_MEMBER_ON_WORKSPACE');
    }

}