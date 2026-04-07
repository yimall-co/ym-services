import { DomainEvent, EventClass } from './event';

export interface EventSubscriber<T extends DomainEvent> {
    subscribedTo(): EventClass;
    on(event: T): Promise<void>;
}
