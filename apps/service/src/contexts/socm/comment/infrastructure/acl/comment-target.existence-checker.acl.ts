import { Target } from 'shared/domain/value-object/target';

import { OfferId } from 'vm/shared/domain/offer-id';
import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { OfferRepository } from 'vm/offer/domain/offer.repository';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';

import { CommentTargets } from 'socm/comment/domain/enum/comment-targets';
import { CommentTargetExistenceChecker } from 'socm/comment/application/ports/comment-target-existence-checker';

export class CommentTargetExistenceCheckerAcl implements CommentTargetExistenceChecker {
    constructor(
        private readonly offerRepository: OfferRepository,
        private readonly workspaceRepository: WorkspaceRepository,
    ) { }

    async exists(target: Target<CommentTargets>): Promise<boolean> {
        if (target.type === 'offers') {
            return this.offerRepository.exists(new OfferId(target.id));
        }

        if (target.type === 'workspaces') {
            return this.workspaceRepository.exists(new WorkspaceId(target.id));
        }

        return false;
    }
}
