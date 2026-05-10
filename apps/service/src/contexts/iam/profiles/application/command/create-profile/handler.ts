import { Command } from 'shared/domain/command';
import { Uuid } from 'shared/domain/value-object/uuid';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Profile } from 'iam/profiles/domain/profile';
import { ProfileGender } from 'iam/profiles/domain/value-object/profile-gender';
import { ProfilePronoun } from 'iam/profiles/domain/value-object/profile-pronoun';
import { ProfileCustomGender } from 'iam/profiles/domain/value-object/profile-custom-gender';
import { ProfileCustomPronoun } from 'iam/profiles/domain/value-object/profile-custom-pronoun';
import { ProfileBirthdate } from 'iam/profiles/domain/value-object/profile-birthdate';

import { CreateProfileCommand } from './command';
import { CreateProfileResultDto } from './dto';
import { ProfileRepositoryScope } from '../../profile.repository-scope';

export class CreateProfileCommandHandler implements CommandHandler<
    CreateProfileCommand,
    CreateProfileResultDto
> {
    constructor(private readonly uow: UnitOfWork<ProfileRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateProfileCommand;
    }

    async handle(command: CreateProfileCommand): Promise<CreateProfileResultDto> {
        const userId = new Uuid(command.userId),
            birthdate = ProfileBirthdate.create(command.birthdate),
            gender = command.gender
                ? ProfileGender.fromValue(command.gender)
                : ProfileGender.other(),
            customGender = new ProfileCustomGender(command.customGender ?? ''),
            pronoun = command.pronouns
                ? ProfilePronoun.fromValue(command.pronouns)
                : ProfilePronoun.theyThem(),
            customPronoun = new ProfileCustomPronoun(command.customPronouns ?? ''),
            newsLetter = command.newsLetter;

        const profile = Profile.create(
            userId,
            birthdate,
            gender,
            customGender,
            pronoun,
            customPronoun,
            newsLetter,
        );

        return this.uow.withTransaction(async (scope) => {
            const profileRepository = scope.getProfileRepository();

            await profileRepository.save(profile);

            const profileId = profile.getId();
            const userId = profile.getUserId();

            return {
                profileId: profileId.value,
                userId: userId.value,
            };
        });
    }
}
