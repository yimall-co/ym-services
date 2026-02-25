import { ValueObject } from './base.value-object';

export abstract class BooleanValueObject extends ValueObject<boolean> {
    constructor(value: boolean) {
        super(value);

        this.ensureIsBoolean();
    }

    private ensureIsBoolean(): void {
        if (typeof this.value !== 'boolean') {
            throw new Error('Value is not a boolean');
        }
    }
}
