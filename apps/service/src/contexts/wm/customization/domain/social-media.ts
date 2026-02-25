import { ValueObject } from 'shared/domain/value-object/base.value-object';

import { SocialMediaUrl } from './value-object/social-media-url';
import { SocialMediaLabel } from './value-object/social-media-label';
import { SocialMediaPlatform } from './value-object/social-media-platform';

export interface SocialMediaPrimitives {
    url: string;
    label: string;
    platform: string;
}

export class SocialMedia extends ValueObject<SocialMediaPrimitives> {
    readonly url: SocialMediaUrl;
    readonly label: SocialMediaLabel;
    readonly platform: SocialMediaPlatform;

    constructor(url: SocialMediaUrl, label: SocialMediaLabel, platform: SocialMediaPlatform) {
        super({ url: url.value, label: label.value, platform: platform.value });

        this.url = url;
        this.label = label;
        this.platform = platform;
    }

    static fromPrimitives(primitives: SocialMediaPrimitives): SocialMedia {
        return new SocialMedia(
            new SocialMediaUrl(primitives.url),
            new SocialMediaLabel(primitives.label),
            new SocialMediaPlatform(primitives.platform),
        );
    }

    toPrimitives(): SocialMediaPrimitives {
        return {
            url: this.url.value,
            label: this.label.value,
            platform: this.platform.value,
        };
    }
}
