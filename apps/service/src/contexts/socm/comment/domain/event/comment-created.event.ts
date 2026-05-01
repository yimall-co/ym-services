import { DomainEvent, EventAttributes } from 'shared/domain/event';

import { CommentTargets } from '../enum/comment-targets';

interface CommentCreatedEventAttributes {
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

export class CommentCreatedEvent extends DomainEvent {
    static readonly EVENT_NAME = 'comment.created';

    readonly content: string;
    readonly target: {
        id: string;
        type: CommentTargets;
    };
    readonly isEdited: boolean;
    readonly isVisible: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly userId: string;

    constructor({
        content,
        target,
        isEdited,
        isVisible,
        createdAt,
        updatedAt,
        userId,
        aggregateId,
        occurredOn,
        eventId,
    }: CommentCreatedEventAttributes & {
        aggregateId: string;
        occurredOn?: Date;
        eventId?: string;
    }) {
        super({
            eventName: CommentCreatedEvent.EVENT_NAME,
            aggregateId,
            occurredOn,
            eventId,
        });

        this.content = content;
        this.target = target;
        this.isEdited = isEdited;
        this.isVisible = isVisible;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    toPrimitives(): EventAttributes {
        return {
            content: this.content,
            target: this.target,
            isEdited: this.isEdited,
            isVisible: this.isVisible,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId,
        };
    }
}
