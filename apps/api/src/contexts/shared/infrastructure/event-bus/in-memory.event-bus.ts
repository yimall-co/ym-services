/* eslint-disable @typescript-eslint/no-misused-promises */
import { EventEmitter } from 'node:events';

import { EventBus } from 'shared/domain/event-bus';
import { Event } from 'shared/domain/event';

import { EventSubscribers } from './event-subscribers';

export class InMemoryEventBus extends EventEmitter implements EventBus {
    async publish(events: Event[]): Promise<void> {
        events.forEach(event => this.emit(event.eventName, event));
    }

    addSubscriber(subscribers: EventSubscribers): void {
        subscribers.subscribers.forEach(subscriber => {
            subscriber.subscribedTo().forEach(event => {
                this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
            });
        });
    }
}
