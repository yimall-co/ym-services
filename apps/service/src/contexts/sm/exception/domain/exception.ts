import { AggregateRoot } from 'shared/domain/aggregate-root';

import { ExceptionId } from 'sm/shared/domain/exception-id';

import { ExceptionDate } from './value-object/exception-date';
import { ExceptionReason } from './value-object/exception-reason';
import { ExceptionIsClosed } from './value-object/exception-is-closed';
import { ExceptionCreatedAt } from './value-object/exception-created-at';
import { ExceptionUpdatedAt } from './value-object/exception-updated-at';
import { ExceptionShopId } from './value-object/exception-shop-id';

export interface ExceptionPrimitives {
    id: string;
    date: Date;
    reason: string;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;
    shopId: string;
}

export class Exception extends AggregateRoot {
    readonly id: ExceptionId;
    readonly date: ExceptionDate;
    readonly reason: ExceptionReason;
    readonly isClosed: ExceptionIsClosed;
    readonly createdAt: ExceptionCreatedAt;
    readonly updatedAt: ExceptionUpdatedAt;
    readonly shopId: ExceptionShopId;

    constructor(
        id: ExceptionId,
        date: ExceptionDate,
        reason: ExceptionReason,
        isClosed: ExceptionIsClosed,
        createdAt: ExceptionCreatedAt,
        updatedAt: ExceptionUpdatedAt,
        shopId: ExceptionShopId,
    ) {
        super();

        this.id = id;
        this.date = date;
        this.reason = reason;
        this.isClosed = isClosed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.shopId = shopId;
    }

    static fromPrimitives(primitives: ExceptionPrimitives): Exception {
        return new Exception(
            new ExceptionId(primitives.id),
            new ExceptionDate(primitives.date),
            new ExceptionReason(primitives.reason),
            new ExceptionIsClosed(primitives.isClosed),
            new ExceptionCreatedAt(primitives.createdAt),
            new ExceptionUpdatedAt(primitives.updatedAt),
            new ExceptionShopId(primitives.shopId),
        );
    }

    toPrimitives(): ExceptionPrimitives {
        return {
            id: this.id.value,
            date: this.date.value,
            reason: this.reason.value,
            isClosed: this.isClosed.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            shopId: this.shopId.value,
        };
    }
}
