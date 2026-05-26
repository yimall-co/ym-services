import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CampaignItemDescription extends StringValueObject {
    static readonly MAX_LENGTH = 2000;

    constructor(value: string) {
        super(value);

        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (this.value.length > CampaignItemDescription.MAX_LENGTH) {
            throw new Error('Campaign item description is too long');
        }
    }
}
