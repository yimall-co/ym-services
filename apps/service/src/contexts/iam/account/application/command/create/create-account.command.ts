import { Command } from 'shared/domain/command';

import { AccountProvider } from 'iam/account/domain/value-object/account-provider-id';

type Provider = keyof typeof AccountProvider;

export class CreateAccountCommand extends Command {
    readonly accountId: string;
    readonly providerId: Provider;
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
        providerId: Provider,
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
        this.providerId = providerId;
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
