import { DomainEvent } from './event';

export abstract class AggregateRoot<TPrimitives = any> {
    private events: Array<DomainEvent>;

    constructor() {
        this.events = [];
    }

    /**
     * @param event - New event to save
     * @returns void
     */
    record(event: DomainEvent): void {
        this.events.push(event);
    }

    /**
     * @returns - Array of current events and sets current events to empty list.
     */
    pullEvents(): Array<DomainEvent> {
        const events = this.events.slice();
        this.events = [];

        return events;
    }

    abstract toPrimitives(): TPrimitives;
}
