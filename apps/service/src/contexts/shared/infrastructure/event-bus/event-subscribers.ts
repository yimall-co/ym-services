import { Event } from 'shared/domain/event';
import { EventSubscriber } from 'shared/domain/event-subscriber';

export class EventSubscribers {
    constructor(public readonly subscribers: Array<EventSubscriber<Event>>) { }
}
