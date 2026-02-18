import { StringValueObject } from './string.value-object';

export abstract class UuidValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidUuid();
    }

    private ensureIsValidUuid(): void {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(this.value)) {
            throw new Error('Invalid UUID');
        }
    }
}