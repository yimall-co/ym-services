import { Filters } from './filters';
import { Limit } from './limit';
import { Offset } from './offset';
import { Order } from './order';

export class Criteria {
    readonly filters: Filters;
    readonly order: Order;
    readonly limit: Limit;
    readonly offset: Offset;

    constructor(filters: Filters, order: Order, limit: Limit, offset: Offset) {
        this.filters = filters;
        this.order = order;
        this.limit = limit;
        this.offset = offset;
    }

    hasFilters(): boolean {
        return this.filters.filters.length > 0;
    }

    hasOrder(): boolean {
        return this.order.hasOrder();
    }

    hasLimit(): boolean {
        return this.limit.hasValue();
    }

    hasOffset(): boolean {
        return this.offset.hasValue();
    }
}
