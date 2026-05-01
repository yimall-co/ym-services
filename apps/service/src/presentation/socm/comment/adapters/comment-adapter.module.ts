import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { OfferRepository } from 'vm/offer/domain/offer.repository';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { CommentateOnCommandHandler } from 'socm/comment/application/command/commentate-on/handler';
import { CommentTargetExistenceCheckerAcl } from 'socm/comment/infrastructure/acl/comment-target.existence-checker.acl';
import { DrizzleCommentRepository } from 'socm/comment/infrastructure/persistence/drizzle-comment.repository';
import { DrizzleCommentUnitOfWork } from 'socm/comment/infrastructure/persistence/drizzle-comment.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';
import { OFFER_REPOSITORY } from 'presentation/vm/offer/adapters/constants';
import { WORKSPACE_REPOSITORY } from 'presentation/wm/workspace/adapters/constants';
import { OfferAdapterModule } from 'presentation/vm/offer/adapters/offer-adapter.module';
import { WorkspaceAdapterModule } from 'presentation/wm/workspace/adapters/workspace-adapter.module';

import {
    COMMENT_REPOSITORY,
    COMMENT_TARGET_EXISTENCE_CHECKER,
    COMMENT_UNIT_OF_WORK,
    COMMENTATE_ON_COMMAND_HANDLER,
} from './constants';

@Module({
    imports: [OfferAdapterModule, WorkspaceAdapterModule],
    providers: [
        {
            provide: COMMENT_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleCommentRepository(db),
            scope: Scope.REQUEST,
        },
        {
            provide: COMMENT_UNIT_OF_WORK,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleCommentUnitOfWork(db),
            scope: Scope.REQUEST,
        },
        {
            provide: COMMENT_TARGET_EXISTENCE_CHECKER,
            inject: [OFFER_REPOSITORY, WORKSPACE_REPOSITORY],
            useFactory: (
                offerRepository: OfferRepository,
                workspaceRepository: WorkspaceRepository,
            ) => new CommentTargetExistenceCheckerAcl(offerRepository, workspaceRepository),
            scope: Scope.REQUEST,
        },
        {
            provide: COMMENTATE_ON_COMMAND_HANDLER,
            inject: [COMMENT_UNIT_OF_WORK, COMMENT_TARGET_EXISTENCE_CHECKER],
            useFactory: (
                commentUnitOfWork: DrizzleCommentUnitOfWork,
                commentTargetExistenceChecker: CommentTargetExistenceCheckerAcl,
            ) => new CommentateOnCommandHandler(commentUnitOfWork, commentTargetExistenceChecker),
            scope: Scope.REQUEST,
        },
    ],
    exports: [
        COMMENT_REPOSITORY,
        COMMENT_UNIT_OF_WORK,
        COMMENT_TARGET_EXISTENCE_CHECKER,
        COMMENTATE_ON_COMMAND_HANDLER,
    ],
})
export class CommentAdapterModule { }
