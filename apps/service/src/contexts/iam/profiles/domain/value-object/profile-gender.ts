import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export class ProfileGender extends EnumValueObject<Gender> { }
