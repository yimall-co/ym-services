import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { minutesToSeconds, secondsToMilliseconds } from 'date-fns';

import { hash, verify } from 'lib/utils';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { GetUserByEmailQuery } from 'iam/user/application/query/get-user-by-email/query';
import { UserByEmailDto } from 'iam/user/application/query/get-user-by-email/dto';
import { CreateUserCommand } from 'iam/user/application/command/create-user/command';
import { CreateUserResultDto } from 'iam/user/application/command/create-user/dto';
import { CreateAccountCommand } from 'iam/account/application/command/create/create-account.command';
import { CreateAccountDto } from 'iam/account/application/command/create/create-account.dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { RefreshDto } from './dtos/refresh.dto';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';

@ApiTags('Auth')
@Controller({
    path: 'auth',
    version: '1',
})
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
        private readonly jwtService: JwtService,
    ) { }

    @Post('login')
    @ApiCreatedResponse({ description: 'Log in' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @HttpCode(HttpStatus.CREATED)
    async signIn(@Body() body: SignInDto) {
        try {
            const { emailOrUsername, password } = body;

            const query = new GetUserByEmailQuery(emailOrUsername);
            const user = await this.queryBus.ask<UserByEmailDto>(query);

            const account = user.accounts.find((acc) => acc.providerId === 'credential');
            if (!account) {
                throw new Error('user doesnt have a credential account');
            }

            const validPassword = await verify(account.password, password);
            if (!validPassword) {
                throw new Error('Invalid credentials');
            }

            const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt } =
                await this.generateTokens({ sub: user.id, email: user.email });

            return {
                accessToken,
                accessTokenExpiresAt,
                refreshToken,
                refreshTokenExpiresAt,
            };
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnauthorizedException();
        }
    }

    @Post('sign-up')
    @ApiCreatedResponse({ description: 'User sign up' })
    @ApiUnauthorizedResponse({ description: 'Cant signup user' })
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() body: SignUpDto) {
        try {
            const { name, image, email, password } = body;

            const createUserCommand = new CreateUserCommand(name, image ?? '', email);

            const { userId } =
                await this.commandBus.dispatch<CreateUserResultDto>(createUserCommand);

            const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt } =
                await this.generateTokens({ sub: userId, email });

            const hashPassword = await hash(password);

            const createAccountCommand = new CreateAccountCommand(
                userId,
                'CREDENTIAL',
                accessToken,
                refreshToken,
                '',
                new Date(accessTokenExpiresAt),
                new Date(refreshTokenExpiresAt),
                '',
                hashPassword,
                userId,
            );

            await this.commandBus.dispatch<CreateAccountDto>(createAccountCommand);

            return {
                accessToken,
                accessTokenExpiresAt,
                refreshToken,
                refreshTokenExpiresAt,
            };
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnauthorizedException();
        }
    }

    @Post('refresh')
    @ApiCreatedResponse({ description: 'Access token refreshed' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @HttpCode(HttpStatus.CREATED)
    async refresh(@Body() refreshDto: RefreshDto) {
        try {
            return { message: 'refreshing token' };
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnauthorizedException();
        }
    }

    private async generateTokens(dto: JwtPayloadDto) {
        const getExpiresAt = (expiresIn: number) => Date.now() + secondsToMilliseconds(expiresIn);

        // 2 hours
        const accessTokenExpiresIn = minutesToSeconds(120);
        const accessTokenExpiresAt = getExpiresAt(accessTokenExpiresIn);
        const accessToken = await this.jwtService.signAsync(dto);

        // 7 days
        const refreshTokenExpiresIn = minutesToSeconds(10080);
        const refreshTokenExpiresAt = getExpiresAt(refreshTokenExpiresIn);
        const refreshToken = await this.jwtService.signAsync(dto, {
            expiresIn: '7d',
        });

        return {
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
            refreshTokenExpiresAt,
        };
    }
}
