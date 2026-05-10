import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class AccountScope extends StringValueObject {
    constructor(value: string) {
        super(value);
    }

    static none(): AccountScope {
        return new AccountScope('');
    }
}
