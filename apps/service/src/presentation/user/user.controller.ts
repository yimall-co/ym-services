/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Post,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiCreatedResponse, ApiParam, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

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
