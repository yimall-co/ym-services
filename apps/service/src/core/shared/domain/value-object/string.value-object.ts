import { BaseValueObject } from './base.value-object';

export abstract class StringValueObject extends BaseValueObject<string> {
    constructor(value: string) {
        super(value);

        this.ensureIsDefined();
        this.ensureIsString();
    }

    isEmpty(): boolean {
        return this.value.length === 0;
    }

    hasOnlyWhitespace(): boolean {
        return this.value.trim().length === 0;
    }

    private ensureIsDefined(): void {
        if (typeof this.value === 'undefined' || this.value === null) {
            throw new Error('Empty string');
        }
    }

    private ensureIsString(): void {
        if (typeof this.value !== 'string') {
            throw new Error('Value is not a string');
        }
    }
}
