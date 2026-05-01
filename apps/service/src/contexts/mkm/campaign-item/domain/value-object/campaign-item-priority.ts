import { NumberValueObject } from 'shared/domain/value-object/number.value-object';

export class CampaignItemPriority extends NumberValueObject {
    constructor(value: number) {
        super(value);

        this.ensureIsInteger();
        this.ensureIsPositive();
    }

    static fromToIncrement(value: number): CampaignItemPriority {
        if (value < 0) {
            throw new Error('Priority must be a non-negative number');
        }

        return new CampaignItemPriority(value + 1);
    }

    private ensureIsPositive(): void {
        if (this.value < 0) {
            throw new Error('Priority must be a non-negative number');
        }
    }

    private ensureIsInteger(): void {
        if (!this.isInteger()) {
            throw new Error('Priority must be an integer');
        }
    }
}
