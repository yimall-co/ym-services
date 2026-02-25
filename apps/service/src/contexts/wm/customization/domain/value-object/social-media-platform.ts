import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class SocialMediaPlatform extends StringValueObject {
    private static readonly PLATFORMS = ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'];

    constructor(value: string) {
        super(value);

        this.ensureIsValidPlatform();
    }

    private ensureIsValidPlatform() {
        if (!SocialMediaPlatform.PLATFORMS.includes(this.value)) {
            throw new Error('Invalid platform');
        }
    }
}
