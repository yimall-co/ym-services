import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dtos/create-profile.dto';

@Controller({
    path: 'profiles',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class ProfileController {
    private logger = new Logger(ProfileController.name);

    constructor(private readonly profileService: ProfileService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: '' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProfileDto: CreateProfileDto) {
        try {
            return await this.profileService.createProfile(createProfileDto);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException();
        }
    }
}
