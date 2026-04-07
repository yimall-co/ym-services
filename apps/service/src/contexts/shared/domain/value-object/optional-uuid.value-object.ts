import { v4 } from 'uuid';

import { StringValueObject } from './string.value-object';

export class OptionalUuidValueObject extends StringValueObject {
    constructor(value: string | null) {
        super(value ?? '');
    }

    static random(): OptionalUuidValueObject {
        const randomUuid = v4();
        return new OptionalUuidValueObject(randomUuid);
    }

    static some(value: string): OptionalUuidValueObject {
        const uuid = new OptionalUuidValueObject(value);
        uuid.ensureIsValidUuid();
        return uuid;
    }

    static none(): OptionalUuidValueObject {
        return new OptionalUuidValueObject(null);
    }

    private ensureIsValidUuid(): void {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(this.value)) {
            throw new Error('Invalid UUID');
        }
    }
}
