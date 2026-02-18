import { DateValueObject } from './date.value-object';

export abstract class CreatedAtValueObject extends DateValueObject {
    constructor(value: Date) {
        super(value);

        this.ensureIsPresentOrPast();
    }

    private ensureIsPresentOrPast(): void {
        if (this.value > new Date()) {
            throw new Error('Invalid created at');
        }
    }
}