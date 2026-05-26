import { AggregateRoot } from 'shared/domain/aggregate-root';
import { Uuid } from 'shared/domain/value-object/uuid';
import { Target } from 'shared/domain/value-object/target';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';

import { ReactionTypes } from './enum/reaction-types';
import { ReactionTargets } from './enum/reaction-targets';
import { ReactionType } from './value-object/reaction-type';

export interface ReactionPrimitives {
    id: string;
    type: ReactionTypes;
    target: {
        id: string;
        type: ReactionTargets;
    };
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export class Reaction extends AggregateRoot<ReactionPrimitives> {
    private readonly id: Uuid;
    private type: ReactionType;
    private target: Target<ReactionTargets>;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private userId: Uuid;

    constructor(
        id: Uuid,
        type: ReactionType,
        target: Target<ReactionTargets>,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        userId: Uuid,
    ) {
        super();

        this.id = id;
        this.type = type;
        this.target = target;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    static create(
        type: ReactionTypes,
        target: ReactionPrimitives['target'],
        userId: string,
    ): Reaction {
        const reaction = new Reaction(
            Uuid.random(),
            new ReactionType(type),
            new Target(target.type, target.id),
            CreatedAt.now(),
            UpdatedAt.now(),
            new Uuid(userId),
        );

        return reaction;
    }

    static fromPrimitives(primitives: ReactionPrimitives): Reaction {
        return new Reaction(
            new Uuid(primitives.id),
            new ReactionType(primitives.type),
            new Target(primitives.target.type, primitives.target.id),
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.userId),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    getType(): ReactionType {
        return this.type;
    }

    getTarget(): Target<ReactionTargets> {
        return this.target;
    }

    getCreatedAt(): CreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): UpdatedAt {
        return this.updatedAt;
    }

    getUserId(): Uuid {
        return this.userId;
    }

    toPrimitives(): ReactionPrimitives {
        return {
            id: this.id.value,
            type: this.type.value,
            target: {
                id: this.target.id,
                type: this.target.type,
            },
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            userId: this.userId.value,
        };
    }
}
