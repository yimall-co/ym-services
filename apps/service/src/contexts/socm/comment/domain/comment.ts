import { AggregateRoot } from 'shared/domain/aggregate-root';
import { Uuid } from 'shared/domain/value-object/uuid';
import { Target } from 'shared/domain/value-object/target';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';

import { CommentTargets } from './enum/comment-targets';
import { CommentContent } from './value-object/comment-content';
import { CommentCreatedEvent } from './event/comment-created.event';

export interface CommentPrimitives {
    id: string;
    content: string;
    target: {
        id: string;
        type: CommentTargets;
    };
    isEdited: boolean;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export class Comment extends AggregateRoot<CommentPrimitives> {
    private readonly id: Uuid;
    private content: CommentContent;
    private target: Target<CommentTargets>;
    private isEdited: boolean;
    private isVisible: boolean;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private userId: Uuid;

    constructor(
        id: Uuid,
        content: CommentContent,
        target: Target<CommentTargets>,
        isEdited: boolean,
        isVisible: boolean,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        userId: Uuid,
    ) {
        super();

        this.id = id;
        this.content = content;
        this.target = target;
        this.isEdited = isEdited;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    static create(content: string, target: CommentPrimitives['target'], userId: string): Comment {
        const comment = new Comment(
            Uuid.random(),
            new CommentContent(content),
            new Target(target.type, target.id),
            false,
            true,
            CreatedAt.now(),
            UpdatedAt.now(),
            new Uuid(userId),
        );

        comment.record(
            new CommentCreatedEvent({
                content: comment.getContent().value,
                target: comment.getTarget().value,
                isEdited: comment.getIsEdited(),
                isVisible: comment.getIsVisible(),
                createdAt: comment.getCreatedAt().value,
                updatedAt: comment.getUpdatedAt().value,
                userId: comment.getUserId().value,
                aggregateId: comment.getId().value,
            }),
        );

        return comment;
    }

    static fromPrimitives(primitives: CommentPrimitives): Comment {
        return new Comment(
            new Uuid(primitives.id),
            new CommentContent(primitives.content),
            new Target(primitives.target.type, primitives.target.id),
            primitives.isEdited,
            primitives.isVisible,
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.userId),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    getContent(): CommentContent {
        return this.content;
    }

    getTarget(): Target<CommentTargets> {
        return this.target;
    }

    getIsEdited(): boolean {
        return this.isEdited;
    }

    getIsVisible(): boolean {
        return this.isVisible;
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

    toPrimitives(): CommentPrimitives {
        return {
            id: this.id.value,
            content: this.content.value,
            target: {
                id: this.target.id,
                type: this.target.type,
            },
            isEdited: this.isEdited,
            isVisible: this.isVisible,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            userId: this.userId.value,
        };
    }
}
