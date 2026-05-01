import { CommentRepository } from '../domain/comment.repository';

export interface CommentRepositoryScope {
    getCommentRepository(): CommentRepository;
}
