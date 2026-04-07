import { DomainEvent } from './event';

export interface EventBus {
    publish(events: Array<DomainEvent>): Promise<void>;
    addSubscriber(subscribers: any): void;
}
