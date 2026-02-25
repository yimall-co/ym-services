import { ValueObject } from './base.value-object';

export abstract class NumberValueObject extends ValueObject<number> {
    constructor(value: number) {
        super(value);

        this.ensureIsValidNumber(value);
    }

    isGreatherThan(value: number): boolean {
        return this.value > value;
    }

    isLessThan(value: number): boolean {
        return this.value < value;
    }

    isGreaterThanOrEqual(value: number): boolean {
        return this.value >= value;
    }

    isLessThanOrEqual(value: number): boolean {
        return this.value <= value;
    }

    isBetween(min: number, max: number): boolean {
        return this.value >= min && this.value <= max;
    }

    private ensureIsValidNumber(value: number): void {
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
    }
}
