import { DateValueObject } from './date.value-object';

export abstract class UpdatedAtValueObject extends DateValueObject {
    constructor(value: Date) {
        super(value);

        this.ensureIsPresentOrPast();
    }

    private ensureIsPresentOrPast(): void {
        if (this.value > new Date()) {
            throw new Error('Invalid updated at');
        }
    }
}
