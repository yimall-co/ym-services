import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CampaignDescription extends StringValueObject {
    static readonly MAX_LENGTH = 1000;
    static readonly MIN_LENGTH = 0;

    constructor(value: string) {
        super(value);

        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (
            this.value.length < CampaignDescription.MIN_LENGTH ||
            this.value.length > CampaignDescription.MAX_LENGTH
        ) {
            throw new Error('Campaign description must be between 0 and 1000 characters');
        }
    }
}
