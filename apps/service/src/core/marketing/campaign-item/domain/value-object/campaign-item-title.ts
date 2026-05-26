import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CampaignItemTitle extends StringValueObject {
    static readonly MAX_LENGTH = 250;

    constructor(value: string) {
        super(value);

        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (this.value.length > CampaignItemTitle.MAX_LENGTH) {
            throw new Error('Campaign item title is too long');
        }
    }
}
