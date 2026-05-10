import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

import { UserId } from 'iam/shared/domain/user-id';
import { Account } from 'iam/account/domain/account';
import { AccountRepository } from 'iam/account/domain/account.repository';
import { AccountAccountId } from 'iam/account/domain/value-object/account-account-id';
import { AccountProvider } from 'iam/account/domain/value-object/account-provider-id';
import { AccountAccessToken } from 'iam/account/domain/value-object/account-access-token';
import { AccountRefreshToken } from 'iam/account/domain/value-object/account-refresh-token';
import { AccountIdToken } from 'iam/account/domain/value-object/account-id-token';
import { AccountAccessTokenExpiresAt } from 'iam/account/domain/value-object/account-access-token-expires-at';
import { AccountRefreshTokenExpiresAt } from 'iam/account/domain/value-object/account-refresh-token-expires-at';
import { AccountScope } from 'iam/account/domain/value-object/account-scope';
import { AccountPassword } from 'iam/account/domain/value-object/account-password';

import { CreateAccountDto } from './create-account.dto';
import { CreateAccountCommand } from './create-account.command';

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
