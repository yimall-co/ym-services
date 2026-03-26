import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Profile } from 'iam/profiles/domain/profile';
import { UserId } from 'iam/shared/domain/user-id';
import { Gender, ProfileGender } from 'iam/profiles/domain/value-object/profile-gender';
import { ProfilePronoun, Pronoun } from 'iam/profiles/domain/value-object/profile-pronoun';
import { ProfileCustomGender } from 'iam/profiles/domain/value-object/profile-custom-gender';
import { ProfileCustomPronoun } from 'iam/profiles/domain/value-object/profile-custom-pronoun';
import { ProfileBirthdate } from 'iam/profiles/domain/value-object/profile-birthdate';
import { ProfileNewsLetter } from 'iam/profiles/domain/value-object/profile-news-letter';

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
        const profile = Profile.create(
            new UserId(command.userId),
            new ProfileBirthdate(command.birthdate),
            new ProfileGender(
                Gender[command.gender as keyof typeof Gender] ?? Gender.OTHER,
                Object.values(Gender),
            ),
            new ProfileCustomGender(command.customGender ?? ''),
            new ProfilePronoun(
                Pronoun[command.pronouns as keyof typeof Pronoun] ?? Pronoun.THEY_THEM,
                Object.values(Pronoun),
            ),
            new ProfileCustomPronoun(command.customPronouns ?? ''),
            new ProfileNewsLetter(command.newsLetter ?? false),
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
