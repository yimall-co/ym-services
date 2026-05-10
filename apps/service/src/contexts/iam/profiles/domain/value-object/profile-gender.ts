import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

import { gender, Gender } from '../enum/gender';

export class ProfileGender extends EnumValueObject<Gender> {
    constructor(value: Gender) {
        super(value, Object.values(gender));
    }

    static fromValue(value: string): ProfileGender {
        for (const genderValue of Object.values(gender)) {
            if (genderValue === value) {
                return new ProfileGender(genderValue);
            }
        }

        throw new Error(`Invalid gender value: ${value}`);
    }

    static other(): ProfileGender {
        return new ProfileGender(gender.OTHER);
    }
}
