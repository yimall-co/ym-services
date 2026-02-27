import { ValueObject } from './base.value-object';

export abstract class StringValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);

        this.ensureIsDefined();
    }

    isEmpty(): boolean {
        return this.value.length === 0;
    }

    private ensureIsDefined(): void {
        if (typeof this.value === 'undefined' || this.value === null) {
            throw new Error('Empty string');
        }
    }
}
