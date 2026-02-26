/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { v4 } from 'uuid';

import { StringValueObject } from './string.value-object';

export class UuidValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidUuid();
    }

    static random(): UuidValueObject {
        const randomUuid = v4();
        return new UuidValueObject(randomUuid);
    }

    private ensureIsValidUuid(): void {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(this.value)) {
            throw new Error('Invalid UUID');
        }
    }
}
