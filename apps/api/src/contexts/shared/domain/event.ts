export interface EventPrimitives {
    readonly eventName: string;
    readonly occurredOn: Date;
    readonly aggregateId: string;
    readonly eventId: string;
}

export abstract class Event implements EventPrimitives {
    static EVENT_NAME: string;
    static fromPrimitives: (primitives: EventPrimitives) => Event;

    readonly eventName: string;
    readonly occurredOn: Date;
    readonly aggregateId: string;
    readonly eventId: string;

    constructor(primitives: EventPrimitives) {
        this.eventName = primitives.eventName;
        this.occurredOn = primitives.occurredOn;
        this.aggregateId = primitives.aggregateId;
        this.eventId = primitives.eventId;
    }

    abstract toPrimitives(): EventPrimitives;
}

export type EventClass = {
    EVENT_NAME: string;
    fromPrimitives: (primitives: EventPrimitives) => Event;
}