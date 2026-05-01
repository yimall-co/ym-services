import { Reaction } from 'socm/reaction/domain/reaction';

import { reactions } from '../persistence/drizzle/reactions.table';

export class DrizzleReactionMapper {
    static toDomain(primitives: typeof reactions.$inferSelect): Reaction {
        return Reaction.fromPrimitives({
            id: primitives.id,
            type: primitives.type,
            target: {
                id: primitives.targetId,
                type: primitives.targetType,
            },
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            userId: primitives.userId ?? '',
        });
    }

    static toPersistence(reaction: Reaction): typeof reactions.$inferInsert {
        const primitives = reaction.toPrimitives();

        return {
            id: primitives.id,
            type: primitives.type,
            targetId: primitives.target.id,
            targetType: primitives.target.type,
            userId: primitives.userId,
        };
    }
}
