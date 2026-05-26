import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class WorkspaceVersion extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsInteger();
        this.ensureIsPositive();
    }

    private ensureIsInteger(): void {
        if (!this.isInteger()) {
            throw new Error('Version must be an integer');
        }
    }

    private ensureIsPositive(): void {
        if (this.isLessThan(0)) {
            throw new Error('Version must be positive');
        }
    }
}
