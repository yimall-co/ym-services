import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Reaction } from 'socm/reaction/domain/reaction';
import { reactionTypes } from 'socm/reaction/domain/enum/reaction-types';
import { ReactionExists } from 'socm/reaction/domain/error/reaction-exists';

import { LikeCommand } from './command';
import { LikeResultDto } from './dto';
import { ReactionRepositoryScope } from '../../reaction.repository-scope';

export class LikeCommandHandler implements CommandHandler<LikeCommand, LikeResultDto> {
    constructor(private readonly uow: UnitOfWork<ReactionRepositoryScope>) { }

    subscribedTo(): Command {
        return LikeCommand;
    }

    async handle(command: LikeCommand): Promise<LikeResultDto> {
        const like = Reaction.create(
            reactionTypes.LIKE,
            {
                id: command.targetId,
                type: command.targetType,
            },
            command.userId,
        );

        return this.uow.withTransaction(async (scope) => {
            const reactionRepository = scope.getReactionRepository();

            const exists = await reactionRepository.exists(like.getUserId(), like.getTarget());
            if (exists) {
                throw new ReactionExists();
            }

            await reactionRepository.save(like);

            return {
                reactionId: like.getId().value,
            };
        });
    }
}
