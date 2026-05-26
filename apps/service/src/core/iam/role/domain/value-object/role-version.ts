import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class RoleVersion extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsInteger();
        this.ensureIsPositive();
    }

    private ensureIsInteger(): void {
        if (!Number.isInteger(this.value)) {
            throw new Error('Role version must be an integer');
        }
    }

    private ensureIsPositive(): void {
        if (this.value < 0) {
            throw new Error('Role version must be positive');
        }
    }
}
