import { Command } from 'shared/domain/command';
import { Uuid } from 'shared/domain/value-object/uuid';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { User } from 'iam/user/domain/user';
import { UserName } from 'iam/user/domain/value-object/user-name';
import { UserEmail } from 'iam/user/domain/value-object/user-email';
import { UserImage } from 'iam/user/domain/value-object/user-image';
import { UserAlreadyExists } from 'iam/user/domain/error/user-already-exists';
import { Profile } from 'iam/profiles/domain/profile';
import { ProfileBirthdate } from 'iam/profiles/domain/value-object/profile-birthdate';
import { Account } from 'iam/account/domain/account';
import { PasswordService } from 'iam/account/domain/service/password.service';

import { RegisterUserCommand } from './command';
import { RegisterUserResultDto } from './dto';
import { UserRepositoryScope } from '../../user.repository-scope';
import { AccountPassword } from 'iam/account/domain/value-object/account-password';
import { AccountAccessToken } from 'iam/account/domain/value-object/account-access-token';
import { AccountRefreshToken } from 'iam/account/domain/value-object/account-refresh-token';

export class RegisterUserCommandHandler implements CommandHandler<
    RegisterUserCommand,
    RegisterUserResultDto
> {
    constructor(
        private readonly uow: UnitOfWork<UserRepositoryScope>,
        private readonly passwordService: PasswordService,
    ) { }

    subscribedTo(): Command {
        return RegisterUserCommand;
    }

    async handle(command: RegisterUserCommand): Promise<RegisterUserResultDto> {
        const name = UserName.create(command.name),
            email = UserEmail.create(command.email),
            roles = command.roles?.map((role) => new Uuid(role)) ?? [],
            image = command.image ? UserImage.some(command.image) : UserImage.none();

        const user = User.create(name, email, roles, image);

        return this.uow.withTransaction(async (scope) => {
            const userRepository = scope.getUserRepository();
            const accountRepository = scope.getAccountRepository();
            const profileRepository = scope.getProfileRepository();

            const existsByEmail = await userRepository.existsActiveByEmail(user.getEmail());
            if (existsByEmail) {
                throw new UserAlreadyExists();
            }

            await userRepository.save(user);

            const userId = Uuid.create(user.getId().value),
                birthdate = ProfileBirthdate.create(
                    new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
                );

            const profile = Profile.create(userId, birthdate);

            await profileRepository.save(profile);

            const passwordHash = await this.passwordService.hash(command.password);

            const password = AccountPassword.create(passwordHash),
                accessToken = AccountAccessToken.none(),
                refreshToken = AccountRefreshToken.none();

            const account = Account.create(userId, password, userId, accessToken, refreshToken);

            await accountRepository.save(account);

            return {
                userId: userId.value,
                accessToken: '',
                accessTokenExpiresAt: Date.now(),
                refreshToken: '',
                refreshTokenExpiresAt: Date.now(),
            };
        });
    }
}
