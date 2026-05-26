import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class OfferStock extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsPositive();
    }

    static create(value: number): OfferStock {
        return new OfferStock(value);
    }

    private ensureIsPositive(): void {
        if (this.isLessThan(0)) {
            throw new Error('Offer stock cannot be negative');
        }
    }
}
