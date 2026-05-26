import { DateValueObject } from './date.value-object';

export class UpdatedAt extends DateValueObject {
    constructor(value: Date) {
        super(value);

        this.ensureIsNotFuture();
    }

    static now(): UpdatedAt {
        return new UpdatedAt(new Date());
    }

    private ensureIsNotFuture(): void {
        if (this.value > new Date()) {
            throw new Error('Invalid updated at');
        }
    }
}
