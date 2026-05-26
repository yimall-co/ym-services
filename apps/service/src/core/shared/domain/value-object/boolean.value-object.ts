import { BaseValueObject } from './base.value-object';

export abstract class BooleanValueObject extends BaseValueObject<boolean> {
    constructor(value: boolean) {
        super(value);

        this.ensureIsBoolean();
    }

    protected toggle(): void {
        this.value = !this.value;
    }

    private ensureIsBoolean(): void {
        if (typeof this.value !== 'boolean') {
            throw new Error('Value is not a boolean');
        }
    }
}
