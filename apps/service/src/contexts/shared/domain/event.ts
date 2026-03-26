import { UuidValueObject } from './value-object/uuid.value-object';

export type EventAttributes = Record<string, any>;

export abstract class Event {
    static EVENT_NAME: string;
    static fromPrimitives: (primitives: {
        aggregateId: string;
        occurredOn?: Date;
        eventId?: string;
        attributes: EventAttributes;
    }) => Event;

    readonly eventName: string;
    readonly aggregateId: string;
    readonly occurredOn: Date;
    readonly eventId: string;

    constructor(primitives: {
        eventName: string;
        aggregateId: string;
        occurredOn?: Date;
        eventId?: string;
    }) {
        const { eventName, aggregateId, occurredOn, eventId } = primitives;

        this.eventName = eventName;
        this.aggregateId = aggregateId;
        this.occurredOn = occurredOn ?? new Date();
        this.eventId = eventId ?? UuidValueObject.random().value;
    }

    abstract toPrimitives(): EventAttributes;
}

export type EventClass = {
    EVENT_NAME: string;
    fromPrimitives: (primitives: {
        aggregateId: string;
        occurredOn?: Date;
        eventId?: string;
        attributes: any;
    }) => Event;
};
