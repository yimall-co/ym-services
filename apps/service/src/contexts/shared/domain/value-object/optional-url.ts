import { StringValueObject } from './string.value-object';

export class OptionalUrl extends StringValueObject {
    constructor(value: string | null) {
        super(value ?? '');
    }

    static some(value: string): OptionalUrl {
        const url = new OptionalUrl(value);
        url.ensureIsValidUrl();
        return url;
    }

    static none(): OptionalUrl {
        return new OptionalUrl(null);
    }

    private ensureIsValidUrl(): void {
        try {
            new URL(this.value);
        } catch {
            throw new Error('Invalid URL');
        }
    }
}
