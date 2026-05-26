import { DateValueObject } from 'shared/domain/value-object/date.value-object';

export class OfferEndDate extends DateValueObject {
    static readonly MAX_DATE = new Date(9999, 11, 31, 0, 0, 0, 0);

    constructor(value: Date) {
        super(value);
    }

    static create(value: Date): OfferEndDate {
        return new OfferEndDate(value);
    }

    static createMaxDate(): OfferEndDate {
        return new OfferEndDate(OfferEndDate.MAX_DATE);
    }

    isMaxDate(): boolean {
        return this.value.getTime() === OfferEndDate.MAX_DATE.getTime();
    }
}
