import { v4 } from 'uuid';

import { StringValueObject } from './string.value-object';

export class OptionalUuid extends StringValueObject {
    constructor(value: string | null) {
        super(value ?? '');
    }

    static random(): OptionalUuid {
        const randomUuid = v4();
        return new OptionalUuid(randomUuid);
    }

    static some(value: string): OptionalUuid {
        const uuid = new OptionalUuid(value);
        uuid.ensureIsValidUuid();
        return uuid;
    }

    static none(): OptionalUuid {
        return new OptionalUuid(null);
    }

    private ensureIsValidUuid(): void {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(this.value)) {
            throw new Error('Invalid UUID');
        }
    }
}
