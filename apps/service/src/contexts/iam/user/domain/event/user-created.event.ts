/* eslint-disable prettier/prettier */
import { Event, EventAttributes } from 'shared/domain/event';

interface UserCreatedEventAttributes {
    name: string;
    email: string;
    image: string;
}

export class UserCreatedEvent extends Event {
    static readonly EVENT_NAME: string = 'user.created';

    readonly name: string;
    readonly email: string;
    readonly image: string;

    constructor({
        name,
        email,
        image,
        aggregateId,
        occurredOn,
        eventId
    }: UserCreatedEventAttributes & { aggregateId: string; occurredOn?: Date; eventId?: string }) {
        super({
            eventName: UserCreatedEvent.EVENT_NAME,
            aggregateId,
            occurredOn,
            eventId
        });

        this.name = name;
        this.email = email;
        this.image = image;
    }

    static fromPrimitives(primitives: {
        aggregateId: string;
        occurredOn?: Date;
        eventId?: string;
        attributes: UserCreatedEventAttributes;
    }): Event {
        const { aggregateId, occurredOn, eventId, attributes } = primitives;

        return new UserCreatedEvent({
            name: attributes.name,
            email: attributes.email,
            image: attributes.image,
            aggregateId,
            occurredOn,
            eventId,
        });
    }

    toPrimitives(): EventAttributes {
        return {
            name: this.name,
            email: this.email,
            image: this.image,
        };
    }
}
