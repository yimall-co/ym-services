import { and, eq } from 'drizzle-orm';

import { Uuid } from 'shared/domain/value-object/uuid';
import { Target } from 'shared/domain/value-object/target';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Reaction } from 'socm/reaction/domain/reaction';
import { ReactionRepository } from 'socm/reaction/domain/reaction.repository';
import { ReactionTargets } from 'socm/reaction/domain/enum/reaction-targets';

import { reactions } from './drizzle/reactions.table';
import { DrizzleReactionMapper } from '../mapper/drizzle-reaction.mapper';

export class DrizzleReactionRepository
    extends DrizzleRepository<typeof reactions>
    implements ReactionRepository {
    protected readonly table = reactions;

    async exists(userId: Uuid, target: Target<ReactionTargets>): Promise<boolean> {
        // User cant have multiple likes for the same target.
        const rows = await this.client
            .select({ likeId: this.table.id })
            .from(this.table)
            .where(
                and(
                    eq(this.table.userId, userId.value),
                    eq(this.table.targetId, target.id),
                    eq(this.table.targetType, target.type),
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async save(reaction: Reaction): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            await tx
                .insert(this.table)
                .values(DrizzleReactionMapper.toPersistence(reaction))
                .onConflictDoNothing();
        });
    }
}
