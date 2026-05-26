import { DomainEvent } from './event';
import { Entity } from './entity';

export abstract class AggregateRoot<TPrimitives = any> extends Entity<TPrimitives> {
    private events: Array<DomainEvent>;

    constructor() {
        super();

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
}
