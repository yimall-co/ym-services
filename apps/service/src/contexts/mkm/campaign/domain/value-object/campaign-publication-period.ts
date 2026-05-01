import { BaseValueObject } from 'shared/domain/value-object/base.value-object';

export class CampaignPublicationPeriod extends BaseValueObject<{ startDate: Date; endDate: Date }> {
    constructor(period: { startDate: Date; endDate: Date }) {
        super(period);
    }

    static create(startDate: Date, endDate: Date): CampaignPublicationPeriod {
        if (!startDate || !endDate) {
            throw new Error('Start date and end date are required');
        }

        if (startDate.getTime() >= endDate.getTime()) {
            throw new Error('Start date must be before end date');
        }

        return new CampaignPublicationPeriod({
            startDate: new Date(startDate.getTime()),
            endDate: new Date(endDate.getTime()),
        });
    }

    get startDate(): Date {
        return this.value.startDate;
    }

    get endDate(): Date {
        return this.value.endDate;
    }

    isActiveAt(date: Date): boolean {
        const time = date.getTime();
        const startDate = this.startDate.getTime();
        const endDate = this.endDate.getTime();

        return time >= startDate && time <= endDate;
    }
}
