/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Param,
    Post,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

import { User } from 'presentation/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { UserService } from './user.service';
import { AddRoleToUserDto } from './dtos/add-role-to-user.dto';

@Controller({
    path: 'users',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) { }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOwnUser(@User('userId') userId: string) {
        try {
            return await this.userService.getOwnUser(userId);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }

    @Get('userinfo')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getUserInfoById(@User('userId') userId: string) {
        try {
            return await this.userService.getUserInfoById(userId);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get('me/workspaces')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOwnWorkspaces(@User('userId') userId: string) {
        try {
            return await this.userService.getOwnWorkspaces(userId);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }


    @Post(':id/roles')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiCreatedResponse({ description: 'Role added successfully' })
    @ApiUnprocessableEntityResponse({ description: 'User not found' })
    @HttpCode(HttpStatus.CREATED)
    async addRoleToUser(
        @Param('id') userId: string,
        @Body() addRoleToUserDto: AddRoleToUserDto
    ) {
        try {
            return await this.userService.addRoleToUser(userId, addRoleToUserDto);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException();
        }
    }
}
