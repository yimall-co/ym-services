/* eslint-disable prettier/prettier */
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    NotFoundException,
    Param,
    Post,
    UnprocessableEntityException,
    UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { GetUserByIdQuery } from 'core/iam/user/application/query/get-user-by-id/query';
import { UserByIdDto } from 'core/iam/user/application/query/get-user-by-id/dto';
import { GetUserInfoByIdQuery } from 'core/iam/user/application/query/get-user-info-by-id/query';
import { UserInfoByIdDto } from 'core/iam/user/application/query/get-user-info-by-id/dto';
import { GetWorkspacesByUserIdQuery } from 'wm/workspace/application/query/get-workspaces-by-user-id/query';
import { WorkspaceByUserDto } from 'wm/workspace/application/query/get-workspaces-by-user-id/dto';
import { AddRoleToUserCommand } from 'core/iam/user/application/command/add-role-to-user/command';
import { AddRoleToUserResultDto } from 'core/iam/user/application/command/add-role-to-user/dto';

import { User } from 'src/common/decorators/user.decorator';
import { COMMAND_BUS, QUERY_BUS } from 'src/common/adapters/constants';

import { AddRoleToUserDto } from './dtos/add-role-to-user.dto';

@ApiTags('Users')
@Controller({
    path: 'users',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Get('me')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOwnUser(@User('userId') userId: string) {
        try {
            const query = new GetUserByIdQuery(userId);
            return await this.queryBus.ask<UserByIdDto>(query);
        } catch (error: any) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }

    @Get('userinfo')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getUserInfoById(@User('userId') userId: string) {
        try {
            const query = new GetUserInfoByIdQuery(userId);
            return await this.queryBus.ask<UserInfoByIdDto>(query);
        } catch (error: any) {
            this.logger.error(error);
            throw new NotFoundException(error.message);
        }
    }

    @Get('me/workspaces')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOwnWorkspaces(@User('userId') userId: string) {
        try {
            const query = new GetWorkspacesByUserIdQuery(userId);
            return await this.queryBus.ask<Array<WorkspaceByUserDto>>(query);
        } catch (error: any) {
            this.logger.error(error);
            throw new NotFoundException(error.message);
        }
    }


    @Post(':id/roles')
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiCreatedResponse({ description: 'Role added successfully' })
    @ApiUnprocessableEntityResponse({ description: 'User not found' })
    @HttpCode(HttpStatus.CREATED)
    async addRoleToUser(
        @Param('id') userId: string,
        @Body() body: AddRoleToUserDto
    ) {
        try {
            const command = new AddRoleToUserCommand(userId, body.roleId);
            return await this.commandBus.dispatch<AddRoleToUserResultDto>(command);
        } catch (error: any) {
            this.logger.error(error);
            throw new UnprocessableEntityException(error.message);
        }
    }
}
