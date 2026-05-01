import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CampaignName extends StringValueObject {
    static readonly MAX_LENGTH = 100;
    static readonly MIN_LENGTH = 3;

    constructor(value: string) {
        super(value);

        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (
            this.value.length < CampaignName.MIN_LENGTH ||
            this.value.length > CampaignName.MAX_LENGTH
        ) {
            throw new Error('Campaign name must be between 3 and 100 characters');
        }
    }
}
