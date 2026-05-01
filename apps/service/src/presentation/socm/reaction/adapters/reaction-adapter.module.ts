import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { LikeCommandHandler } from 'socm/reaction/application/command/like/handler';
import { DrizzleReactionUnitOfWork } from 'socm/reaction/infrastructure/persistence/drizzle-reaction.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import { LIKE_COMMAND_HANDLER, REACTION_UNIT_OF_WORK } from './constants';

@Module({
    providers: [
        {
            provide: REACTION_UNIT_OF_WORK,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleReactionUnitOfWork(db),
            scope: Scope.REQUEST,
        },
        {
            provide: LIKE_COMMAND_HANDLER,
            inject: [REACTION_UNIT_OF_WORK],
            useFactory: (reactionUnitOfWork: DrizzleReactionUnitOfWork) =>
                new LikeCommandHandler(reactionUnitOfWork),
            scope: Scope.REQUEST,
        },
    ],
    exports: [REACTION_UNIT_OF_WORK, LIKE_COMMAND_HANDLER],
})
export class ReactionAdapterModule { }
