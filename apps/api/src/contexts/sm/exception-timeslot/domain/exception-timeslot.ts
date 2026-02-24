import { AggregateRoot } from "shared/domain/aggregate-root";

import { ExceptionId } from "sm/shared/domain/exception-id";
import { ExceptionTimeSlotId } from "sm/shared/domain/exception-timeslot-id";

import { ExceptionTimeSlotStartTime } from "./value-object/exception-timeslot-start-time";
import { ExceptionTimeSlotEndTime } from "./value-object/exception-timeslot-end-time";
import { ExceptionTimeSlotCreatedAt } from "./value-object/exception-timeslot-created-at";
import { ExceptionTimeSlotUpdatedAt } from "./value-object/exception-timeslot-updated-at";

export interface ExceptionTimeSlotPrimitives {
    id: string;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
    exceptionId: string;
}

export class ExceptionTimeSlot extends AggregateRoot {
    readonly id: ExceptionTimeSlotId;
    readonly startTime: ExceptionTimeSlotStartTime;
    readonly endTime: ExceptionTimeSlotEndTime;
    readonly createdAt: ExceptionTimeSlotCreatedAt;
    readonly updatedAt: ExceptionTimeSlotUpdatedAt;
    readonly exceptionId: ExceptionId;

    constructor(
        id: ExceptionTimeSlotId,
        startTime: ExceptionTimeSlotStartTime,
        endTime: ExceptionTimeSlotEndTime,
        createdAt: ExceptionTimeSlotCreatedAt,
        updatedAt: ExceptionTimeSlotUpdatedAt,
        exceptionId: ExceptionId,
    ) {
        super();

        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.exceptionId = exceptionId;
    }

    static fromPrimitives(primitives: ExceptionTimeSlotPrimitives): ExceptionTimeSlot {
        return new ExceptionTimeSlot(
            new ExceptionTimeSlotId(primitives.id),
            new ExceptionTimeSlotStartTime(primitives.startTime),
            new ExceptionTimeSlotEndTime(primitives.endTime),
            new ExceptionTimeSlotCreatedAt(primitives.createdAt),
            new ExceptionTimeSlotUpdatedAt(primitives.updatedAt),
            new ExceptionId(primitives.exceptionId)
        );
    }

    toPrimitives(): ExceptionTimeSlotPrimitives {
        return {
            id: this.id.value,
            startTime: this.startTime.value,
            endTime: this.endTime.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            exceptionId: this.exceptionId.value,
        };
    }
}