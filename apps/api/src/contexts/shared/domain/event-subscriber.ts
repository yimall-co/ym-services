import { Event, EventClass } from "./event";

export interface EventSubscriber<T extends Event> {
    subscribedTo(): Array<EventClass>;
    on(event: T): Promise<void>;
}