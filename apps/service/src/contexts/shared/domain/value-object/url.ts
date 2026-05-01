import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class Url extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidUrl();
    }

    private ensureIsValidUrl() {
        try {
            new URL(this.value);
        } catch {
            throw new Error('Invalid URL');
        }
    }
}
