import { Command } from 'shared/domain/command';

import { AccountProviders } from 'core/iam/account/domain/enum/account-providers';

export class CreateAccountCommand extends Command {
    readonly accountId: string;
    readonly provider: AccountProviders;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly idToken: string;
    readonly accessTokenExpiresAt: Date;
    readonly refreshTokenExpiresAt: Date;
    readonly scope: string;
    readonly password: string;
    readonly userId: string;

    constructor(
        accountId: string,
        provider: AccountProviders,
        accessToken: string,
        refreshToken: string,
        idToken: string,
        accessTokenExpiresAt: Date,
        refreshTokenExpiresAt: Date,
        scope: string,
        password: string,
        userId: string,
    ) {
        super();

        this.accountId = accountId;
        this.provider = provider;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.idToken = idToken;
        this.accessTokenExpiresAt = accessTokenExpiresAt;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
        this.scope = scope;
        this.password = password;
        this.userId = userId;
    }
}
