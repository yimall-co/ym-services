import { DomainError } from 'shared/domain/domain-error';

export class ReactionExists extends DomainError {
    constructor() {
        super('Reaction already exists', 'REACTION_ALREADY_EXISTS');
    }
}
