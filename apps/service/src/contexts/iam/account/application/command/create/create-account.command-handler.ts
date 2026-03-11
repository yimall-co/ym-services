import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

import { UserId } from 'iam/shared/domain/user-id';
import { Account } from 'iam/account/domain/account';
import { AccountRepository } from 'iam/account/domain/account.repository';
import { AccountAccountId } from 'iam/account/domain/value-object/account-account-id';
import {
    AccountProvider,
    AccountProviderId,
} from 'iam/account/domain/value-object/account-provider-id';
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
        const account = Account.create(
            new AccountAccountId(command.accountId),
            new AccountProviderId(
                AccountProvider[command.providerId as keyof typeof AccountProvider],
            ),
            new AccountAccessToken(command.accessToken),
            new AccountRefreshToken(command.refreshToken),
            new AccountIdToken(command.idToken),
            new AccountAccessTokenExpiresAt(command.accessTokenExpiresAt),
            new AccountRefreshTokenExpiresAt(command.refreshTokenExpiresAt),
            new AccountScope(command.scope),
            new AccountPassword(command.password),
            new UserId(command.userId),
        );

        await this.accountRepository.save(account);

        const accountId = account.getId();

        return { accountId: accountId.value };
    }
}
