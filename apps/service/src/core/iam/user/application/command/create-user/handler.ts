/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { RoleId } from 'core/iam/shared/domain/role-id';
import { UserId } from 'core/iam/shared/domain/user-id';
import { User } from 'core/iam/user/domain/user';
import { Profile } from 'core/iam/profiles/domain/profile';
import { UserAlreadyExists } from 'core/iam/user/domain/error/user-already-exists';
import { UserName } from 'core/iam/user/domain/value-object/user-name';
import { UserEmail } from 'core/iam/user/domain/value-object/user-email';
import { UserImage } from 'core/iam/user/domain/value-object/user-image';
import { ProfileBirthdate } from 'core/iam/profiles/domain/value-object/profile-birthdate';

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
        return { userId: '' };
    }
}
