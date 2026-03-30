import { Event, EventClass } from './event';

export interface EventSubscriber<T extends Event> {
    subscribedTo(): EventClass;
    on(event: T): Promise<void>;
}
