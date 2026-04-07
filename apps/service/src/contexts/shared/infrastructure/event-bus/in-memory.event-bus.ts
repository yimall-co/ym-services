import { EventEmitter, EventEmitterOptions } from 'node:events';

import { DomainEvent } from 'shared/domain/event';
import { EventBus } from 'shared/domain/event-bus';

import { EventSubscribers } from './event-subscribers';

export class InMemoryEventBus extends EventEmitter implements EventBus {
    constructor(
        private readonly eventSubscribers: EventSubscribers,
        private readonly options?: EventEmitterOptions,
    ) {
        super(options);

        this.eventSubscribers.subscribers.forEach((subscriber) =>
            this.on(subscriber.subscribedTo().EVENT_NAME, subscriber.on.bind(subscriber)),
        );
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        if (!events) return;

        events.forEach((event) => this.emit(event.eventName, event));
    }

    addSubscriber(eventSubscribers: EventSubscribers): this {
        // subscribers.subscribers.forEach((subscriber) => {
        //     subscriber.subscribedTo().forEach((event) => {
        //         this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
        //     });
        // });

        return this;
    }
}
