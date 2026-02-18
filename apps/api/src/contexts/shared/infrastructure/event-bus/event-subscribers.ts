import { DependencyContainer } from 'tsyringe';

import { Event } from 'shared/domain/event';
import { EventSubscriber } from 'shared/domain/event-subscriber';

export class EventSubscribers {
    constructor(public readonly subscribers: Array<EventSubscriber<Event>>) { }

    static from(container: DependencyContainer): EventSubscribers {
        const subscribers = container.resolveAll<EventSubscriber<Event>>('EventSubscriber');
        return new EventSubscribers(subscribers);
    }
}
