import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

import { AuthController } from './auth.controller';
import { AuthAdapterModule } from './adapters/auth-adapter.module';

@Module({
    controllers: [AuthController],
    providers: [JwtStrategy],
    imports: [
        AuthAdapterModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const jwtSecret = configService.getOrThrow<string>('jwt.accessSecret');
                const jwtPublicKey = configService.getOrThrow<string>('jwt.accessPublicKey');
                const jwtPrivateKey = configService.getOrThrow<string>('jwt.accessPrivateKey');

                return {
                    signOptions: {
                        // expiresIn: '2h', // TODO: set to this.
                        expiresIn: '7d', // just for testing
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
        }),
    ],
    exports: [AuthAdapterModule, JwtStrategy],
})
export class AuthModule { }
