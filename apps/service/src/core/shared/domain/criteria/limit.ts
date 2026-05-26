import { NumberValueObject } from '../value-object/number.value-object';

export class Limit extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsPositive();
    }

    static fromValue(value: number): Limit {
        return new Limit(value);
    }

    static none(): Limit {
        return new Limit(0);
    }

    hasValue(): boolean {
        return this.isGreatherThan(0);
    }

    hasNoValue(): boolean {
        return this.isZero();
    }

    private ensureIsPositive(): void {
        if (this.isGreatherThan(0)) {
            throw new Error('Limit must be greater than 0');
        }
    }
}
