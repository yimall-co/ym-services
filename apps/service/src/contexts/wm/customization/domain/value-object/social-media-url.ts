import { Url } from 'shared/domain/value-object/url';

export class SocialMediaUrl extends Url {
    constructor(value: string) {
        super(value);
    }
}
