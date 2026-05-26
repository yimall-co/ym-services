import { StringValueObject } from '../value-object/string.value-object';

export class FilterValue extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureNotContainsSpecialCharacters();
    }

    static fromValue(value: string): FilterValue {
        return new FilterValue(value);
    }

    hasValue(): boolean {
        return !this.isEmpty() && !this.hasOnlyWhitespace();
    }

    hasNoValue(): boolean {
        return this.isEmpty() || this.hasOnlyWhitespace();
    }

    private ensureNotContainsSpecialCharacters(): void {
        const regex = /[^a-zA-Z0-9_]/;
        if (regex.test(this.value)) {
            throw new Error('Filter value cannot contain special characters');
        }
    }
}
