import { Event, EventClass } from 'shared/domain/event';
import { EventSubscriber } from 'shared/domain/event-subscriber';
import { UserCreatedEvent } from 'iam/user/domain/event/user-created.event';

export class LoggerSubscriber implements EventSubscriber<UserCreatedEvent> {
    subscribedTo(): EventClass {
        return UserCreatedEvent;
    }

    async on(event: UserCreatedEvent): Promise<void> {
        console.log(`[DomainEvent] ${event.eventName}: ${JSON.stringify(event.toPrimitives())}`);
    }
}
