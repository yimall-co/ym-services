import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class VisitIpAddress extends StringValueObject {
    constructor(value: string) {
        super(value);

        // this.ensureIsValidIp();
    }

    private ensureIsValidIp(): void {
        const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipRegex.test(this.value)) {
            throw new Error('Invalid IP address');
        }
    }
}
