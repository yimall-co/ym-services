import { Uuid } from 'shared/domain/value-object/uuid';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';
import { AggregateRoot } from 'shared/domain/aggregate-root';

import { PasswordService } from './service/password.service';
import { accountProviders, AccountProviders } from './enum/account-providers';
import { AccountAccountId } from './value-object/account-account-id';
import { AccountProvider } from './value-object/account-provider-id';
import { AccountAccessToken } from './value-object/account-access-token';
import { AccountRefreshToken } from './value-object/account-refresh-token';
import { AccountIdToken } from './value-object/account-id-token';
import { AccountAccessTokenExpiresAt } from './value-object/account-access-token-expires-at';
import { AccountRefreshTokenExpiresAt } from './value-object/account-refresh-token-expires-at';
import { AccountScope } from './value-object/account-scope';
import { AccountPassword } from './value-object/account-password';

export interface AccountPrimitives {
    id: string;
    accountId: string;
    provider: AccountProviders;
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
    private readonly id: Uuid;
    private accountId: AccountAccountId;
    private provider: AccountProvider;
    private accessToken: AccountAccessToken;
    private refreshToken: AccountRefreshToken;
    private idToken: AccountIdToken;
    private accessTokenExpiresAt: AccountAccessTokenExpiresAt;
    private refreshTokenExpiresAt: AccountRefreshTokenExpiresAt;
    private scope: AccountScope;
    private password: AccountPassword;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private readonly userId: Uuid;

    constructor(
        id: Uuid,
        accountId: AccountAccountId,
        provider: AccountProvider,
        accessToken: AccountAccessToken,
        refreshToken: AccountRefreshToken,
        idToken: AccountIdToken,
        accessTokenExpiresAt: AccountAccessTokenExpiresAt,
        refreshTokenExpiresAt: AccountRefreshTokenExpiresAt,
        scope: AccountScope,
        password: AccountPassword,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        userId: Uuid,
    ) {
        super();

        this.id = id;
        this.accountId = accountId;
        this.provider = provider;
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
        password: AccountPassword,
        userId: Uuid,
        accessToken?: AccountAccessToken,
        refreshToken?: AccountRefreshToken,
        idToken?: AccountIdToken,
        accessTokenExpiresAt?: AccountAccessTokenExpiresAt,
        refreshTokenExpiresAt?: AccountRefreshTokenExpiresAt,
        scope?: AccountScope,
        provider?: AccountProvider,
    ): Account {
        return new Account(
            Uuid.random(),
            accountId,
            provider ?? AccountProvider.credential(),
            accessToken ?? AccountAccessToken.none(),
            refreshToken ?? AccountRefreshToken.none(),
            idToken ?? AccountIdToken.none(),
            accessTokenExpiresAt ?? AccountAccessTokenExpiresAt.none(),
            refreshTokenExpiresAt ?? AccountRefreshTokenExpiresAt.none(),
            scope ?? AccountScope.none(),
            password,
            CreatedAt.now(),
            UpdatedAt.now(),
            userId,
        );
    }

    static fromPrimitives(primitives: AccountPrimitives): Account {
        return new Account(
            new Uuid(primitives.id),
            new AccountAccountId(primitives.accountId),
            new AccountProvider(primitives.provider),
            new AccountAccessToken(primitives.accessToken),
            new AccountRefreshToken(primitives.refreshToken),
            new AccountIdToken(primitives.idToken),
            new AccountAccessTokenExpiresAt(primitives.accessTokenExpiresAt),
            new AccountRefreshTokenExpiresAt(primitives.refreshTokenExpiresAt),
            new AccountScope(primitives.scope),
            new AccountPassword(primitives.password),
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.userId),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    getAccountId(): AccountAccountId {
        return this.accountId;
    }

    getProviderId(): AccountProvider {
        return this.provider;
    }

    getAccessToken(): AccountAccessToken {
        return this.accessToken;
    }

    getRefreshToken(): AccountRefreshToken {
        return this.refreshToken;
    }

    getIdToken(): AccountIdToken {
        return this.idToken;
    }

    getAccessTokenExpiresAt(): AccountAccessTokenExpiresAt {
        return this.accessTokenExpiresAt;
    }

    getRefreshTokenExpiresAt(): AccountRefreshTokenExpiresAt {
        return this.refreshTokenExpiresAt;
    }

    getScope(): AccountScope {
        return this.scope;
    }

    getPassword(): AccountPassword {
        return this.password;
    }

    getCreatedAt(): CreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): UpdatedAt {
        return this.updatedAt;
    }

    getUserId(): Uuid {
        return this.userId;
    }

    isCredential(): boolean {
        return this.provider.value === accountProviders.CREDENTIAL;
    }

    async validatePassword(
        plainPassword: string,
        passwordService: PasswordService,
    ): Promise<boolean> {
        return passwordService.compare(plainPassword, this.password.value);
    }

    toPrimitives(): AccountPrimitives {
        return {
            id: this.id.value,
            accountId: this.accountId.value,
            provider: this.provider.value,
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
        this.updatedAt = UpdatedAt.now();
    }
}
