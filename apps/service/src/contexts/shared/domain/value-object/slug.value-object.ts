import { StringValueObject } from './string.value-object';

export class SlugValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidSlug();
    }

    static fromRaw(raw: string) {
        const slug = raw
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .split(' ')
            .join('-')
            .trim()
            .toLocaleLowerCase();

        return new SlugValueObject(slug);
    }

    private ensureIsValidSlug(): void {
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!slugRegex.test(this.value)) {
            throw new Error('Invalid slug');
        }
    }
}
