import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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

        return {
            secret: jwtSecret,
            signOptions: {
                expiresIn: '2h',
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
