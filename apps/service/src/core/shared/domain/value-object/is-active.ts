import { BooleanValueObject } from './boolean.value-object';

export class IsActive extends BooleanValueObject {
    constructor(value: boolean) {
        super(value);
    }

    static active(): IsActive {
        return new IsActive(true);
    }

    static inactive(): IsActive {
        return new IsActive(false);
    }

    isActive(): boolean {
        return this.value;
    }
}
