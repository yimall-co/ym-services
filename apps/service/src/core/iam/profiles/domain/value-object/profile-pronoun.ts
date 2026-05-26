import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { pronoun, Pronoun } from '../enum/pronoun';

export class ProfilePronoun extends EnumValueObject<Pronoun> {
    constructor(value: Pronoun) {
        super(value, Object.values(pronoun));
    }

    static fromValue(value: string): ProfilePronoun {
        for (const pronounValue of Object.values(pronoun)) {
            if (pronounValue === value) {
                return new ProfilePronoun(pronounValue);
            }
        }

        throw new Error(`Invalid pronoun value: ${value}`);
    }

    static theyThem(): ProfilePronoun {
        return new ProfilePronoun(pronoun.THEY_THEM);
    }
}
