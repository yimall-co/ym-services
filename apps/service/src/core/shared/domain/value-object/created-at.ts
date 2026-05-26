import { DateValueObject } from './date.value-object';

export class CreatedAt extends DateValueObject {
    constructor(value: Date) {
        super(value);

        this.ensureIsNotFuture();
    }

    static now(): CreatedAt {
        return new CreatedAt(new Date());
    }

    private ensureIsNotFuture(): void {
        if (this.value > new Date()) {
            throw new Error('Invalid created at');
        }
    }
}
