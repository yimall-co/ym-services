import { Uuid } from 'shared/domain/value-object/uuid';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';
import { AggregateRoot } from 'shared/domain/aggregate-root';

import { Gender } from './enum/gender';
import { Pronoun } from './enum/pronoun';
import { ProfileGender } from './value-object/profile-gender';
import { ProfilePronoun } from './value-object/profile-pronoun';
import { ProfileCustomGender } from './value-object/profile-custom-gender';
import { ProfileCustomPronoun } from './value-object/profile-custom-pronoun';
import { ProfileBirthdate } from './value-object/profile-birthdate';

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
    private readonly id: Uuid;
    private gender: ProfileGender;
    private customGender: ProfileCustomGender;
    private pronouns: ProfilePronoun;
    private customPronouns: ProfileCustomPronoun;
    private birthdate: ProfileBirthdate;
    private newsLetter: boolean;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private userId: Uuid;

    constructor(
        id: Uuid,
        gender: ProfileGender,
        customGender: ProfileCustomGender,
        pronouns: ProfilePronoun,
        customPronouns: ProfileCustomPronoun,
        birthdate: ProfileBirthdate,
        newsLetter: boolean,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        userId: Uuid,
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
        userId: Uuid,
        birthdate: ProfileBirthdate,
        gender?: ProfileGender,
        customGender?: ProfileCustomGender,
        pronouns?: ProfilePronoun,
        customPronouns?: ProfileCustomPronoun,
        newsLetter?: boolean,
    ): Profile {
        return new Profile(
            Uuid.random(),
            gender ?? ProfileGender.other(),
            customGender ?? new ProfileCustomGender(''),
            pronouns ?? ProfilePronoun.theyThem(),
            customPronouns ?? new ProfileCustomPronoun(''),
            birthdate,
            newsLetter ?? false,
            CreatedAt.now(),
            UpdatedAt.now(),
            userId,
        );
    }

    static fromPrimitives(primivites: ProfilePrimivites): Profile {
        return new Profile(
            new Uuid(primivites.id),
            new ProfileGender(primivites.gender),
            new ProfileCustomGender(primivites.customGender),
            new ProfilePronoun(primivites.pronouns),
            new ProfileCustomPronoun(primivites.customPronouns),
            new ProfileBirthdate(new Date(primivites.birthdate)),
            primivites.newsLetter,
            new CreatedAt(primivites.createdAt),
            new UpdatedAt(primivites.updatedAt),
            new Uuid(primivites.userId),
        );
    }

    getId(): Uuid {
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

    getNewsLetter(): boolean {
        return this.newsLetter;
    }

    getCreatedAt(): CreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): UpdatedAt {
        return this.updatedAt;
    }

    getUserId(): Uuid {
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
            newsLetter: this.newsLetter,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            userId: this.userId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new UpdatedAt(new Date());
    }
}
