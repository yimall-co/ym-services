import { AggregateRoot } from 'shared/domain/aggregate-root';

import { UserId } from 'iam/shared/domain/user-id';
import { AccountId } from 'iam/shared/domain/account-id';
import { AccountAccountId } from './value-object/account-account-id';
import { AccountProvider, AccountProviderId } from './value-object/account-provider-id';
import { AccountAccessToken } from './value-object/account-access-token';
import { AccountRefreshToken } from './value-object/account-refresh-token';
import { AccountIdToken } from './value-object/account-id-token';
import { AccountAccessTokenExpiresAt } from './value-object/account-access-token-expires-at';
import { AccountRefreshTokenExpiresAt } from './value-object/account-refresh-token-expires-at';
import { AccountScope } from './value-object/account-scope';
import { AccountPassword } from './value-object/account-password';
import { AccountCreatedAt } from './value-object/account-created-at';
import { AccountUpdatedAt } from './value-object/account-updated-at';

export interface AccountPrimitives {
    id: string;
    accountId: string;
    providerId: AccountProvider;
    accessToken: string;
    refreshToken: string;
    idToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    scope: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export class Account extends AggregateRoot<AccountPrimitives> {
    private readonly id: AccountId;
    private accountId: AccountAccountId;
    private providerId: AccountProviderId;
    private accessToken: AccountAccessToken;
    private refreshToken: AccountRefreshToken;
    private idToken: AccountIdToken;
    private accessTokenExpiresAt: AccountAccessTokenExpiresAt;
    private refreshTokenExpiresAt: AccountRefreshTokenExpiresAt;
    private scope: AccountScope;
    private password: AccountPassword;
    private readonly createdAt: AccountCreatedAt;
    private updatedAt: AccountUpdatedAt;
    private readonly userId: UserId;

    constructor(
        id: AccountId,
        accountId: AccountAccountId,
        providerId: AccountProviderId,
        accessToken: AccountAccessToken,
        refreshToken: AccountRefreshToken,
        idToken: AccountIdToken,
        accessTokenExpiresAt: AccountAccessTokenExpiresAt,
        refreshTokenExpiresAt: AccountRefreshTokenExpiresAt,
        scope: AccountScope,
        password: AccountPassword,
        createdAt: AccountCreatedAt,
        updatedAt: AccountUpdatedAt,
        userId: UserId,
    ) {
        super();

        this.id = id;
        this.accountId = accountId;
        this.providerId = providerId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.idToken = idToken;
        this.accessTokenExpiresAt = accessTokenExpiresAt;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
        this.scope = scope;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    static create(
        accountId: AccountAccountId,
        providerId: AccountProviderId,
        accessToken: AccountAccessToken,
        refreshToken: AccountRefreshToken,
        idToken: AccountIdToken,
        accessTokenExpiresAt: AccountAccessTokenExpiresAt,
        refreshTokenExpiresAt: AccountRefreshTokenExpiresAt,
        scope: AccountScope,
        password: AccountPassword,
        userId: UserId,
    ): Account {
        return new Account(
            AccountId.random(),
            accountId,
            providerId,
            accessToken,
            refreshToken,
            idToken,
            accessTokenExpiresAt,
            refreshTokenExpiresAt,
            scope,
            password,
            new AccountCreatedAt(new Date()),
            new AccountUpdatedAt(new Date()),
            userId,
        );
    }

    static fromPrimitives(primitives: AccountPrimitives): Account {
        return new Account(
            new AccountId(primitives.id),
            new AccountAccountId(primitives.accountId),
            new AccountProviderId(primitives.providerId),
            new AccountAccessToken(primitives.accessToken),
            new AccountRefreshToken(primitives.refreshToken),
            new AccountIdToken(primitives.idToken),
            new AccountAccessTokenExpiresAt(primitives.accessTokenExpiresAt),
            new AccountRefreshTokenExpiresAt(primitives.refreshTokenExpiresAt),
            new AccountScope(primitives.scope),
            new AccountPassword(primitives.password),
            new AccountCreatedAt(primitives.createdAt),
            new AccountUpdatedAt(primitives.updatedAt),
            new UserId(primitives.userId),
        );
    }

    getId(): AccountId {
        return this.id;
    }

    toPrimitives(): AccountPrimitives {
        return {
            id: this.id.value,
            accountId: this.accountId.value,
            providerId: this.providerId.value,
            accessToken: this.accessToken.value,
            refreshToken: this.refreshToken.value,
            idToken: this.idToken.value,
            accessTokenExpiresAt: this.accessTokenExpiresAt.value,
            refreshTokenExpiresAt: this.refreshTokenExpiresAt.value,
            scope: this.scope.value,
            password: this.password.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            userId: this.userId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new AccountUpdatedAt(new Date());
    }
}
