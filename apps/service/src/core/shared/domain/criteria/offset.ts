import { NumberValueObject } from '../value-object/number.value-object';

export class Offset extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsPositive();
    }

    static fromValue(value: number): Offset {
        return new Offset(value);
    }

    static none(): Offset {
        return new Offset(0);
    }

    hasValue(): boolean {
        return this.isGreatherThan(0);
    }

    hasNoValue(): boolean {
        return this.isZero();
    }

    private ensureIsPositive(): void {
        if (this.isGreatherThan(0)) {
            throw new Error('Offset must be greater than 0');
        }
    }
}
