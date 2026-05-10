import { BaseValueObject } from './base.value-object';

export abstract class NumberValueObject extends BaseValueObject<number> {
    constructor(value: number) {
        super(value);

        this.ensureIsValidNumber(value);
    }

    protected isInteger(): boolean {
        return Number.isInteger(this.value);
    }

    protected isDecimal(): boolean {
        return !this.isInteger();
    }

    protected isZero(): boolean {
        return this.value === 0;
    }

    protected isGreatherThan(value: number): boolean {
        return this.value > value;
    }

    protected isLessThan(value: number): boolean {
        return this.value < value;
    }

    protected isGreaterThanOrEqual(value: number): boolean {
        return this.value >= value;
    }

    protected isLessThanOrEqual(value: number): boolean {
        return this.value <= value;
    }

    protected isBetween(min: number, max: number): boolean {
        return this.value >= min && this.value <= max;
    }

    private ensureIsValidNumber(value: number): void {
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
    }
}
