import { DomainError } from 'shared/domain/domain-error';

export class CommentExists extends DomainError {
    constructor() {
        super('Comment already exists', 'COMMENT_EXISTS');
    }
}
