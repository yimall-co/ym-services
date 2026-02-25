import { DependencyContainer } from 'tsyringe';

import { Event } from 'shared/domain/event';
import { EventSubscriber } from 'shared/domain/event-subscriber';

export class EventSubscribers {
    constructor(
        readonly subscribers: EventSubscriber<Event>[]
    ) { }

    static from(container: DependencyContainer): EventSubscribers {
        const subscribers = container.resolveAll<EventSubscriber<Event>>('EventSubscriber');
        return new EventSubscribers(subscribers);
    }
}
