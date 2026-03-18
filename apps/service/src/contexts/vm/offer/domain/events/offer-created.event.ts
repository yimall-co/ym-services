/* eslint-disable prettier/prettier */
import { Event, EventAttributes } from 'shared/domain/event';

interface OfferCreatedEventAttributes {
    title: string;
}

export class OfferCreatedEvent extends Event {
    static readonly EVENT_NAME: string = 'offer.created';

    readonly title: string;

    constructor({
        title,
        aggregateId,
        occurredOn,
        eventId
    }: OfferCreatedEventAttributes & { aggregateId: string; occurredOn?: Date; eventId?: string }) {
        super({
            eventName: OfferCreatedEvent.EVENT_NAME,
            aggregateId,
            occurredOn,
            eventId
        });

        this.title = title;
    }

    static fromPrimitives(primitives: {
        aggregateId: string;
        occurredOn?: Date;
        eventId?: string;
        attributes: OfferCreatedEventAttributes;
    }): Event {
        const { aggregateId, occurredOn, eventId, attributes } = primitives;

        return new OfferCreatedEvent({
            title: attributes.title,
            aggregateId,
            occurredOn,
            eventId,
        });
    }

    toPrimitives(): EventAttributes {
        return {
            title: this.title,
        };
    }
}
