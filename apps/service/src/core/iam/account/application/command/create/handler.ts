import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

import { AccountRepository } from 'core/iam/account/domain/account.repository';

import { CreateAccountDto } from './dto';
import { CreateAccountCommand } from './command';

export class CreateAccountCommandHandler implements CommandHandler<
    CreateAccountCommand,
    CreateAccountDto
> {
    constructor(private readonly accountRepository: AccountRepository) { }

    subscribedTo(): Command {
        return CreateAccountCommand;
    }

    async handle(command: CreateAccountCommand): Promise<CreateAccountDto> {
        return { accountId: '' };
    }
}
