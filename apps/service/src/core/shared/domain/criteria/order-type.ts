import { orderTypes, OrderTypes } from '../enum/order-types';
import { EnumValueObject } from '../value-object/enum.value-object';

export class OrderType extends EnumValueObject<OrderTypes> {
    constructor(value: OrderTypes) {
        super(value, Object.values(orderTypes));
    }

    static fromValue(value: string): OrderType {
        for (const orderTypeValue of Object.values(orderTypes)) {
            if (orderTypeValue === value) {
                return new OrderType(value);
            }
        }

        throw new Error(`Invalid order type: ${value}`);
    }

    isAsc(): boolean {
        return this.value === orderTypes.ASC;
    }

    isDesc(): boolean {
        return this.value === orderTypes.DESC;
    }

    isNone(): boolean {
        return this.value === orderTypes.NONE;
    }
}
