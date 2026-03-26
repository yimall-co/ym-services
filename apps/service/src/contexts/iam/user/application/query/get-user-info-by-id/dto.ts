import { Gender } from 'iam/profiles/domain/value-object/profile-gender';
import { Pronoun } from 'iam/profiles/domain/value-object/profile-pronoun';

export interface UserInfoByIdDto {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    profile: {
        gender: Gender | null;
        customGender: string | null;
        pronoun: Pronoun | null;
        customPronoun: string | null;
        birthdate: string | null;
        newsLetter: boolean;
    };
}
