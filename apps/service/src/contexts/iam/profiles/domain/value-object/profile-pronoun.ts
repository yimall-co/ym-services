import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export enum Pronoun {
    HE_HIM = 'he/him',
    SHE_HER = 'she/her',
    THEY_THEM = 'they/them',
}

export class ProfilePronoun extends EnumValueObject<Pronoun> { }
