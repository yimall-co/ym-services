import { Command } from 'shared/domain/command';

export class CreateProfileCommand extends Command {
    readonly gender?: string;
    readonly customGender?: string;
    readonly pronouns?: string;
    readonly customPronouns?: string;
    readonly birthdate: Date;
    readonly newsLetter?: boolean;
    readonly userId: string;

    constructor(
        userId: string,
        birthdate: Date,
        gender?: string,
        customGender?: string,
        pronouns?: string,
        customPronouns?: string,
        newsLetter?: boolean,
    ) {
        super();
        this.userId = userId;
        this.birthdate = birthdate;
        this.gender = gender;
        this.customGender = customGender;
        this.pronouns = pronouns;
        this.customPronouns = customPronouns;
        this.newsLetter = newsLetter;
    }
}
