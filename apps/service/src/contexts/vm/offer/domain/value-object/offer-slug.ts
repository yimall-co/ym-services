import { Slug } from 'shared/domain/value-object/slug';

export class OfferSlug extends Slug {
    static readonly MIN_LENGTH = 3;
    static readonly MAX_LENGTH = 100;

    constructor(value: string) {
        super(value);

        this.ensureLengthIsWithinRange();
    }

    static create(value: string): OfferSlug {
        return new OfferSlug(value);
    }

    private ensureLengthIsWithinRange(): void {
        if (this.value.length < OfferSlug.MIN_LENGTH || this.value.length > OfferSlug.MAX_LENGTH) {
            throw new Error('Offer slug must be between 3 and 100 characters');
        }
    }
}
