import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { socialPlatforms, SocialPlatform } from '../enum/social-platforms';

export class SocialMediaPlatform extends EnumValueObject<SocialPlatform> {
    constructor(value: SocialPlatform) {
        super(value, Object.values(socialPlatforms));
    }
}
