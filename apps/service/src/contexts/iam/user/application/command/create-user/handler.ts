/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { User } from 'iam/user/domain/user';
import { RoleId } from 'iam/shared/domain/role-id';
import { UserName } from 'iam/user/domain/value-object/user-name';
import { UserEmail } from 'iam/user/domain/value-object/user-email';
import { UserImage } from 'iam/user/domain/value-object/user-image';

import { CreateUserResultDto } from './dto';
import { CreateUserCommand } from './command';
import { UserRepositoryScope } from '../../user.repository-scope';

export class CreateUserCommandHandler implements CommandHandler<
    CreateUserCommand,
    CreateUserResultDto
> {
    constructor(private readonly uow: UnitOfWork<UserRepositoryScope>) { }

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

        return this.uow.withTransaction(async (scope) => {
            const userRepository = scope.getUserRepository();

            const userEmailExists = await userRepository.existsActiveByEmail(user.getEmail());
            if (userEmailExists) {
                throw new Error('User already exists');
            }

            await userRepository.save(user);

            const userId = user.getId();

            return { userId: userId.value };
        });
    }
}
