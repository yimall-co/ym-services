import { AggregateRoot } from 'shared/domain/aggregate-root';

import { UserId } from 'iam/shared/domain/user-id';
import { ProfileId } from 'iam/shared/domain/profile-id';

import { Gender, ProfileGender } from './value-object/profile-gender';
import { ProfilePronoun, Pronoun } from './value-object/profile-pronoun';
import { ProfileCustomGender } from './value-object/profile-custom-gender';
import { ProfileCustomPronoun } from './value-object/profile-custom-pronoun';
import { ProfileBirthdate } from './value-object/profile-birthdate';
import { ProfileNewsLetter } from './value-object/profile-news-letter';
import { ProfileCreatedAt } from './value-object/profile-created-at';
import { ProfileUpdatedAt } from './value-object/profile-updated-at';

export interface ProfilePrimivites {
    id: string;
    gender: Gender;
    customGender: string;
    pronouns: Pronoun;
    customPronouns: string;
    birthdate: string;
    newsLetter: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export class Profile extends AggregateRoot<ProfilePrimivites> {
    private readonly id: ProfileId;
    private gender: ProfileGender;
    private customGender: ProfileCustomGender;
    private pronouns: ProfilePronoun;
    private customPronouns: ProfileCustomPronoun;
    private birthdate: ProfileBirthdate;
    private newsLetter: ProfileNewsLetter;
    private readonly createdAt: ProfileCreatedAt;
    private updatedAt: ProfileUpdatedAt;
    private userId: UserId;

    constructor(
        id: ProfileId,
        gender: ProfileGender,
        customGender: ProfileCustomGender,
        pronouns: ProfilePronoun,
        customPronouns: ProfileCustomPronoun,
        birthdate: ProfileBirthdate,
        newsLetter: ProfileNewsLetter,
        createdAt: ProfileCreatedAt,
        updatedAt: ProfileUpdatedAt,
        userId: UserId,
    ) {
        super();
        this.id = id;
        this.gender = gender;
        this.customGender = customGender;
        this.pronouns = pronouns;
        this.customPronouns = customPronouns;
        this.birthdate = birthdate;
        this.newsLetter = newsLetter;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    static create(
        userId: UserId,
        birthdate: ProfileBirthdate,
        gender?: ProfileGender,
        customGender?: ProfileCustomGender,
        pronouns?: ProfilePronoun,
        customPronouns?: ProfileCustomPronoun,
        newsLetter?: ProfileNewsLetter,
    ): Profile {
        return new Profile(
            ProfileId.random(),
            gender ?? new ProfileGender(Gender.OTHER, Object.values(Gender)),
            customGender ?? new ProfileCustomGender(''),
            pronouns ?? new ProfilePronoun(Pronoun.THEY_THEM, Object.values(Pronoun)),
            customPronouns ?? new ProfileCustomPronoun(''),
            birthdate,
            newsLetter ?? new ProfileNewsLetter(false),
            new ProfileCreatedAt(new Date()),
            new ProfileUpdatedAt(new Date()),
            userId,
        );
    }

    static fromPrimitives(primivites: ProfilePrimivites): Profile {
        return new Profile(
            new ProfileId(primivites.id),
            new ProfileGender(primivites.gender, Object.values(Gender)),
            new ProfileCustomGender(primivites.customGender),
            new ProfilePronoun(primivites.pronouns, Object.values(Pronoun)),
            new ProfileCustomPronoun(primivites.customPronouns),
            new ProfileBirthdate(new Date(primivites.birthdate)),
            new ProfileNewsLetter(primivites.newsLetter),
            new ProfileCreatedAt(primivites.createdAt),
            new ProfileUpdatedAt(primivites.updatedAt),
            new UserId(primivites.userId),
        );
    }

    getId(): ProfileId {
        return this.id;
    }

    getGender(): ProfileGender {
        return this.gender;
    }

    getCustomGender(): ProfileCustomGender {
        return this.customGender;
    }

    getPronouns(): ProfilePronoun {
        return this.pronouns;
    }

    getCustomPronouns(): ProfileCustomPronoun {
        return this.customPronouns;
    }

    getBirthdate(): ProfileBirthdate {
        return this.birthdate;
    }

    getNewsLetter(): ProfileNewsLetter {
        return this.newsLetter;
    }

    getCreatedAt(): ProfileCreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): ProfileUpdatedAt {
        return this.updatedAt;
    }

    getUserId(): UserId {
        return this.userId;
    }

    toPrimitives(): ProfilePrimivites {
        return {
            id: this.id.value,
            gender: this.gender.value,
            customGender: this.customGender.value,
            pronouns: this.pronouns.value,
            customPronouns: this.customPronouns.value,
            birthdate: this.birthdate.value.toISOString(),
            newsLetter: this.newsLetter.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            userId: this.userId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new ProfileUpdatedAt(new Date());
    }
}
