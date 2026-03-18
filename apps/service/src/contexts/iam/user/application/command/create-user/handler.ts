/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

import { User } from 'iam/user/domain/user';
import { UserRepository } from 'iam/user/domain/user.repository';
import { UserName } from 'iam/user/domain/value-object/user-name';
import { UserEmail } from 'iam/user/domain/value-object/user-email';
import { UserImage } from 'iam/user/domain/value-object/user-image';

import { CreateUserDto } from './dto';
import { CreateUserCommand } from './command';

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand, CreateUserDto> {
    constructor(private readonly userRepository: UserRepository) { }

    subscribedTo(): Command {
        return CreateUserCommand;
    }

    async handle(command: CreateUserCommand): Promise<CreateUserDto> {
        const user = User.create(
            new UserName(command.name),
            new UserEmail(command.email),
            new UserImage(command.image),
        );

        await this.userRepository.save(user);

        const userId = user.getId();

        return { userId: userId.value };
    }
}
