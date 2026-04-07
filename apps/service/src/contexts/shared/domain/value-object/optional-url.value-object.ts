import { StringValueObject } from './string.value-object';

export class OptionalUrlValueObject extends StringValueObject {
    constructor(value: string | null) {
        super(value ?? '');
    }

    static some(value: string): OptionalUrlValueObject {
        const url = new OptionalUrlValueObject(value);
        url.ensureIsValidUrl();
        return url;
    }

    static none(): OptionalUrlValueObject {
        return new OptionalUrlValueObject(null);
    }

    private ensureIsValidUrl(): void {
        try {
            new URL(this.value);
        } catch {
            throw new Error('Invalid URL');
        }
    }
}
