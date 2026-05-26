import { OrderBy } from './order-by';
import { OrderType } from './order-type';
import { orderTypes } from '../enum/order-types';

export class Order {
    readonly orderBy: OrderBy;
    readonly orderType: OrderType;

    constructor(orderBy: OrderBy, orderType: OrderType) {
        this.orderBy = orderBy;
        this.orderType = orderType;
    }

    static fromValues(orderBy?: string, orderType?: string): Order {
        if (!orderBy) return Order.none();

        return new Order(new OrderBy(orderBy), OrderType.fromValue(orderType || orderTypes.ASC));
    }

    static none(): Order {
        return new Order(new OrderBy(''), new OrderType(orderTypes.NONE));
    }

    static desc(orderBy: string): Order {
        return new Order(new OrderBy(orderBy), new OrderType(orderTypes.DESC));
    }

    static asc(orderBy: string): Order {
        return new Order(new OrderBy(orderBy), new OrderType(orderTypes.ASC));
    }

    hasOrder(): boolean {
        return !this.orderType.isNone();
    }
}
