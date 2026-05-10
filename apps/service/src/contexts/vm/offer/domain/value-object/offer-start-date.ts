import { DateValueObject } from 'shared/domain/value-object/date.value-object';

export class OfferStartDate extends DateValueObject {
    constructor(value: Date) {
        super(value);

        this.ensureIsFuture();
    }

    static create(value: Date): OfferStartDate {
        return new OfferStartDate(value);
    }

    private ensureIsFuture(): void {
        if (this.value.getTime() < Date.now()) {
            throw new Error('Offer start date cannot be in the past');
        }
    }
}
