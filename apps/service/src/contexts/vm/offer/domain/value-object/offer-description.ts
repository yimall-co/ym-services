import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class OfferDescription extends StringValueObject {
    static readonly MIN_LENGTH = 10;
    static readonly MAX_LENGTH = 2500;

    constructor(value: string) {
        super(value);

        this.ensureLengthIsWithinRange();
    }

    static create(value: string): OfferDescription {
        return new OfferDescription(value);
    }

    private ensureLengthIsWithinRange(): void {
        if (
            this.value.length < OfferDescription.MIN_LENGTH ||
            this.value.length > OfferDescription.MAX_LENGTH
        ) {
            throw new Error('Offer description must be between 10 and 2500 characters');
        }
    }
}
