import { ConfigService } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
    accountRepositoryProvider,
    createAccountCommandHandlerProvider,
    createUserCommandHandlerProvider,
    getUserByEmailQueryHandlerProvider,
    userUnitOfWorkProvider,
} from './adapters';
import { JwtStrategy } from './strategies/jwt.strategy';

const passportModule = PassportModule.register({
    defaultStrategy: 'jwt',
});

const jwtModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const jwtSecret = configService.getOrThrow<string>('jwt.accessSecret');
        const jwtPublicKey = configService.getOrThrow<string>('jwt.accessPublicKey');
        const jwtPrivateKey = configService.getOrThrow<string>('jwt.accessPrivateKey');

        return {
            signOptions: {
                expiresIn: '2h',
                algorithm: 'RS256',
            },
            secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
                switch (requestType) {
                    case JwtSecretRequestType.SIGN:
                        return jwtPrivateKey;
                    case JwtSecretRequestType.VERIFY:
                        return jwtPublicKey;
                    default:
                        return jwtSecret;
                }
            },
        };
    },
});

@Module({
    imports: [passportModule, jwtModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        userUnitOfWorkProvider,
        accountRepositoryProvider,
        getUserByEmailQueryHandlerProvider,
        createUserCommandHandlerProvider,
        createAccountCommandHandlerProvider,
    ],
    exports: [
        getUserByEmailQueryHandlerProvider,
        createUserCommandHandlerProvider,
        createAccountCommandHandlerProvider,
    ],
})
export class AuthModule {
    static forRoot(): DynamicModule {
        return {
            module: AuthModule,
        };
    }
}
