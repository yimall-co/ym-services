import { OptionalUrl } from 'shared/domain/value-object/optional-url';

export class CustomizationLogo extends OptionalUrl {
    constructor(value?: string) {
        super(value ?? null);
    }
}
