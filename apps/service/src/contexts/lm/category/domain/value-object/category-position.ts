import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class CategoryPosition extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureValueIsPositive();
    }

    private ensureValueIsPositive() {
        if (this.value < 0) {
            throw new Error('Category position must be positive');
        }
    }
}
