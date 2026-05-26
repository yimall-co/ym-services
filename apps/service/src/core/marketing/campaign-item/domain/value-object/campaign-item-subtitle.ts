import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CampaignItemSubtitle extends StringValueObject {
    static readonly MAX_LENGTH = 300;

    constructor(value: string) {
        super(value);

        this.ensureIsValid();
    }

    private ensureIsValid(): void {
        if (this.value.length > CampaignItemSubtitle.MAX_LENGTH) {
            throw new Error('Campaign item subtitle is too long');
        }
    }
}
