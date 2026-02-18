import { ValueObject } from './base.value-object';

export abstract class StringValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);

        this.ensureIsNotEmpty();
    }

    private ensureIsNotEmpty(): void {
        if (this.value === '') {
            throw new Error('Empty string');
        }
    }
}