import { ArrayValueObject } from 'shared/domain/value-object/array.value-object';

import { SocialMedia } from './social-media';

export class SocialMediaCollection extends ArrayValueObject<SocialMedia> {
    constructor(value: SocialMedia[]) {
        super(value);

        this.ensureNoDuplicates();
    }

    private ensureNoDuplicates(): void {
        const platforms = this.value.map(v => v.platform.value);
        if (new Set(platforms).size !== platforms.length) {
            throw new Error('Social media platforms must be unique');
        }
    }
}