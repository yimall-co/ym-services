import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class CampaignPriority extends NumberValueObject {
    constructor(value: number) {
        super(value);
    }

    static from(value: number): CampaignPriority {
        if (value < 0) {
            throw new Error('Priority must be a non-negative number');
        }

        return new CampaignPriority(value);
    }

    isHigherThan(other: CampaignPriority): boolean {
        return this.isGreatherThan(other.value);
    }

    isLowerThan(other: CampaignPriority): boolean {
        return this.isLessThan(other.value);
    }

    isSameAs(other: CampaignPriority): boolean {
        return this.value === other.value;
    }

    valueOf(): number {
        return this.value;
    }
}
