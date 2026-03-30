/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
// import { EventBus } from 'shared/domain/event-bus';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { RoleId } from 'iam/shared/domain/role-id';
import { UserId } from 'iam/shared/domain/user-id';
import { User } from 'iam/user/domain/user';
import { Profile } from 'iam/profiles/domain/profile';
import { UserAlreadyExists } from 'iam/user/domain/error/user-already-exists';
import { UserName } from 'iam/user/domain/value-object/user-name';
import { UserEmail } from 'iam/user/domain/value-object/user-email';
import { UserImage } from 'iam/user/domain/value-object/user-image';
import { ProfileBirthdate } from 'iam/profiles/domain/value-object/profile-birthdate';

import { CreateUserResultDto } from './dto';
import { CreateUserCommand } from './command';
import { UserRepositoryScope } from '../../user.repository-scope';

export class CreateUserCommandHandler implements CommandHandler<
    CreateUserCommand,
    CreateUserResultDto
> {
    constructor(
        private readonly uow: UnitOfWork<UserRepositoryScope>,
        // private readonly eventBus: EventBus,
    ) { }

    subscribedTo(): Command {
        return CreateUserCommand;
    }

    async handle(command: CreateUserCommand): Promise<CreateUserResultDto> {
        const user = User.create(
            new UserName(command.name),
            new UserEmail(command.email),
            new UserImage(command.image),
            command.roles?.map((role) => new RoleId(role)) ?? [],
        );

        const profile = Profile.create(
            new UserId(user.getId().value),
            new ProfileBirthdate(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)),
        );

        const result = await this.uow.withTransaction(async (scope) => {
            const userRepository = scope.getUserRepository();
            const profileRepository = scope.getProfileRepository();

            const userEmailExists = await userRepository.existsActiveByEmail(user.getEmail());
            if (userEmailExists) {
                throw new UserAlreadyExists();
            }

            await Promise.all([
                userRepository.save(user),
                profileRepository.save(profile), // TODO: create an event for this?
            ]);

            return { userId: user.getId().value };
        });

        // await this.eventBus.publish(user.pullEvents());

        return result;
    }
}
