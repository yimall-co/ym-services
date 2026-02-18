import { StringValueObject } from './string.value-object';

export abstract class SlugValueObject extends StringValueObject {
    constructor(value: string) {
        super(value.trim().toLowerCase());

        this.ensureIsValidSlug();
    }

    private ensureIsValidSlug(): void {
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!slugRegex.test(this.value)) {
            throw new Error('Invalid slug');
        }
    }
}