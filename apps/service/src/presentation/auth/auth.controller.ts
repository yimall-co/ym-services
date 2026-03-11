import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { RefreshDto } from './dtos/refresh.dto';

@Controller({
    path: 'auth',
    version: '1',
})
export class AuthController {
    private readonly logger: Logger = new Logger('AuthController');

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiCreatedResponse({ description: 'Log in' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @HttpCode(HttpStatus.CREATED)
    async signIn(@Body() signInDto: SignInDto) {
        try {
            return await this.authService.signIn(signInDto);
        } catch (error: any) {
            this.logger.error(error);
            throw new UnauthorizedException(error.message);
        }
    }

    @Post('signup')
    @ApiCreatedResponse({ description: 'User sign up' })
    @ApiUnauthorizedResponse({ description: 'Cant signup user' })
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() signUpDto: SignUpDto) {
        try {
            return await this.authService.signUp(signUpDto);
        } catch (error: any) {
            this.logger.error(error);
            throw new UnauthorizedException(error.message);
        }
    }

    @Post('refresh')
    @ApiCreatedResponse({ description: 'Access token refreshed' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @HttpCode(HttpStatus.CREATED)
    async refresh(@Body() refreshDto: RefreshDto) {
        try {
            await this.authService.refresh(refreshDto);
            return { message: 'refreshing token' };
        } catch (error: any) {
            this.logger.error(error);
            throw new UnauthorizedException(error.message);
        }
    }
}
