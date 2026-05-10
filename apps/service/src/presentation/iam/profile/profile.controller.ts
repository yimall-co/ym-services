import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    Post,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CreateProfileCommand } from 'iam/profiles/application/command/create-profile/command';
import { CreateProfileResultDto } from 'iam/profiles/application/command/create-profile/dto';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';
import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateProfileDto } from './dtos/create-profile.dto';

@Controller({
    path: 'profiles',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class ProfileController {
    private logger = new Logger(ProfileController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: '' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateProfileDto) {
        try {
            const command = new CreateProfileCommand(
                body.userId,
                new Date(body.birthdate),
                body.gender,
                body.customGender,
                body.pronouns,
                body.customPronouns,
                body.newsLetter,
            );

            return await this.commandBus.dispatch<CreateProfileResultDto>(command);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException();
        }
    }
}
