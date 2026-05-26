import { BooleanValueObject } from 'shared/domain/value-object/boolean.value-object';

export class CampaignIsActive extends BooleanValueObject {
    constructor(value: boolean) {
        super(value);
    }

    static active(): CampaignIsActive {
        return new CampaignIsActive(true);
    }

    static inactive(): CampaignIsActive {
        return new CampaignIsActive(false);
    }

    isActive(): boolean {
        return this.value;
    }
}
