import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { OfferId } from 'vm/shared/domain/offer-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { Comment } from 'socm/comment/domain/comment';
import { CommentExists } from 'socm/comment/domain/error/comment-exists';

import { CommentateOnCommand } from './command';
import { CommentateOnResultDto } from './dto';
import { CommentRepositoryScope } from '../../comment.repository-scope';
import { CommentTargetExistenceChecker } from '../../ports/comment-target-existence-checker';

export class CommentateOnCommandHandler implements CommandHandler<
    CommentateOnCommand,
    CommentateOnResultDto
> {
    constructor(
        private readonly uow: UnitOfWork<CommentRepositoryScope>,
        private readonly targetExistenceChecker: CommentTargetExistenceChecker,
    ) { }

    subscribedTo(): Command {
        return CommentateOnCommand;
    }

    async handle(command: CommentateOnCommand): Promise<CommentateOnResultDto> {
        const comment = Comment.create(
            command.content,
            {
                id: command.targetId,
                type: command.targetType,
            },
            command.userId,
        );

        return this.uow.withTransaction(async (scope) => {
            const commentRepository = scope.getCommentRepository();

            const target = comment.getTarget();
            const targetExists = await this.targetExistenceChecker.exists(target);
            if (!targetExists) {
                throw new Error(`Target ${target.type} ${target.id} not exists`);
            }

            const alreadyCommented = await commentRepository.existsByUserAndTarget(
                comment.getUserId(),
                comment.getTarget(),
            );
            if (alreadyCommented) {
                throw new CommentExists();
            }

            // TODO: validate targets, cause targetId could not exists for targetType.
            await commentRepository.save(comment);

            return {
                commentId: comment.getId().value,
            };
        });
    }
}
