import { Event } from './event';

export abstract class AggregateRoot<TPrimitives = any> {
    private events: Array<Event>;

    constructor() {
        this.events = [];
    }

    /**
     * @param event - New event to save
     * @returns void
     */
    record(event: Event): void {
        this.events.push(event);
    }

    /**
     * @returns - Array of current events and sets current events to empty list.
     */
    pullEvents(): Array<Event> {
        const events = this.events.slice();
        this.events = [];

        return events;
    }

    abstract toPrimitives(): TPrimitives;
}
