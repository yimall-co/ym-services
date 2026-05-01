import { BaseValueObject } from './base.value-object';

export abstract class DateValueObject extends BaseValueObject<Date> {
    constructor(value: Date) {
        super(value);

        this.ensureIsDate();
    }

    private ensureIsDate(): void {
        if (!(this.value instanceof Date)) {
            throw new Error('Value is not a date');
        }
    }
}
