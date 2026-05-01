import { BaseValueObject } from 'shared/domain/value-object/base.value-object';

export class CampaignItemCallToAction extends BaseValueObject<{
    text: string;
    url: string;
}> {
    constructor(text: string, url: string) {
        super({ text, url });
    }

    static create(text: string, url: string): CampaignItemCallToAction {
        if (!text || !url) {
            throw new Error('Text and URL are required');
        }

        return new CampaignItemCallToAction(text, url);
    }

    get text(): string {
        return this.value.text;
    }

    get url(): string {
        return this.value.url;
    }
}
