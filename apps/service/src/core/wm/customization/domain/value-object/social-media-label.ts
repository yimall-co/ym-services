import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class SocialMediaLabel extends StringValueObject {
    static readonly MAX_LENGTH = 100;

    constructor(value: string) {
        super(value);

        this.ensureMaxLength();
    }

    private ensureMaxLength(): void {
        if (this.value.length > SocialMediaLabel.MAX_LENGTH) {
            throw new Error(
                `Social media label must be less than or equal to ${SocialMediaLabel.MAX_LENGTH} characters`,
            );
        }
    }
}
