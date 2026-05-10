import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class OfferPrice extends NumberValueObject {
    static readonly MIN_PRICE = 0;

    constructor(value: number) {
        super(value);

        this.ensureIsGreatherThanMinPrice();
    }

    static create(value: number): OfferPrice {
        return new OfferPrice(value);
    }

    private ensureIsGreatherThanMinPrice(): void {
        if (this.isLessThan(OfferPrice.MIN_PRICE)) {
            throw new Error('Offer price cannot be less than 0');
        }
    }
}
