import { EventEmitter } from 'node:events';

import { Event } from 'shared/domain/event';
import { EventBus } from 'shared/domain/event-bus';

import { EventSubscribers } from './event-subscribers';

export class InMemoryEventBus extends EventEmitter implements EventBus {
    async publish(events: Array<Event>): Promise<void> {
        if (!events) return;

        events.forEach((event) => this.emit(event.eventName, event));
    }

    addSubscriber(subscribers: EventSubscribers): this {
        subscribers.subscribers.forEach((subscriber) => {
            subscriber.subscribedTo().forEach((event) => {
                this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
            });
        });
        return this;
    }
}
