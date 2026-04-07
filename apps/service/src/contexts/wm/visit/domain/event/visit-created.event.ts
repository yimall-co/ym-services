import { DomainEvent, EventAttributes } from 'shared/domain/event';

export class VisitCreatedEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'visit.created';

    toPrimitives(): EventAttributes {
        throw new Error('Method not implemented.');
    }
}
