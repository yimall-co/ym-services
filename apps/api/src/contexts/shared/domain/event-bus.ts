import { Event } from "./event";

export interface EventBus {
    publish(events: Array<Event>): Promise<void>;
    addSubscriber(subscribers: any): void;
}