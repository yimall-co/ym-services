import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class OfferTitle extends StringValueObject {
    static readonly MIN_LENGTH = 3;
    static readonly MAX_LENGTH = 100;

    constructor(value: string) {
        super(value);

        this.ensureIsNotEmpty();
        this.ensureLengthIsWithinRange();
        this.ensureNoSpecialCharacters();
    }

    static create(value: string): OfferTitle {
        return new OfferTitle(value);
    }

    private ensureIsNotEmpty(): void {
        if (this.isEmpty()) {
            throw new Error('Offer title cannot be empty');
        }
    }

    private ensureLengthIsWithinRange(): void {
        if (
            this.value.length < OfferTitle.MIN_LENGTH ||
            this.value.length > OfferTitle.MAX_LENGTH
        ) {
            throw new Error('Offer title must be between 3 and 100 characters');
        }
    }

    private ensureNoSpecialCharacters(): void {
        const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
        if (specialCharacters.test(this.value)) {
            throw new Error('Offer title cannot contain special characters');
        }
    }
}
