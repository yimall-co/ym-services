import { Target } from 'shared/domain/value-object/target';

import { OfferId } from 'core/sales/shared/domain/offer-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { OfferRepository } from 'core/sales/offer/domain/offer.repository';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';

import { CommentTarget } from 'core/social/comment/domain/enum/comment-targets';
import { CommentTargetExistenceChecker } from 'core/social/comment/application/ports/comment-target-existence-checker';

export class CommentTargetExistenceCheckerAcl implements CommentTargetExistenceChecker {
    constructor(
        private readonly offerRepository: OfferRepository,
        private readonly workspaceRepository: WorkspaceRepository,
    ) { }

    async exists(target: Target<CommentTarget>): Promise<boolean> {
        if (target.type === 'offers') {
            return this.offerRepository.exists(new OfferId(target.id));
        }

        if (target.type === 'workspaces') {
            return this.workspaceRepository.exists(new WorkspaceId(target.id));
        }

        return false;
    }
}
