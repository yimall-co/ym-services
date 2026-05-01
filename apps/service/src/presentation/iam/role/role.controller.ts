import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    Param,
    Post,
    Put,
    UnprocessableEntityException,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CreateRoleCommand } from 'iam/role/application/command/create-role/command';
import { CreateRoleResultDto } from 'iam/role/application/command/create-role/dto';
import { AddPermissionToRoleCommand } from 'iam/role/application/command/add-permission-to-role/command';
import { AddPermissionToRoleResultDto } from 'iam/role/application/command/add-permission-to-role/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateRoleDto } from './dtos/create-role.dto';
import { AddPermissionToRoleDto } from './dtos/add-permission-to-role.dto';

@ApiTags('Roles')
@Controller({
    path: 'roles',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class RoleController {
    private readonly logger = new Logger(RoleController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Post()
    @ApiCreatedResponse({ description: 'Role created successfully' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createRole(@Body() body: CreateRoleDto) {
        try {
            const command = new CreateRoleCommand(
                body.name,
                body.codeName,
                body.description,
                body.permissions,
            );

            return await this.commandBus.dispatch<CreateRoleResultDto>(command);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException();
        }
    }

    @Post(':id/permissions')
    @ApiParam({ name: 'id', description: 'Role ID' })
    @ApiCreatedResponse({ description: 'Permission added to role successfully' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async addPermissionToRole(@Param('id') roleId: string, @Body() body: AddPermissionToRoleDto) {
        try {
            const command = new AddPermissionToRoleCommand(roleId, body.permissionId);
            return await this.commandBus.dispatch<AddPermissionToRoleResultDto>(command);
        } catch (error: any) {
            this.logger.error(error);
            throw new UnprocessableEntityException(error.message);
        }
    }

    @Put(':id')
    @ApiParam({ name: 'id', description: 'Role ID' })
    @ApiCreatedResponse({ description: 'Role updated successfully' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async updateRole(@Param('id') id: string, @Body() updateRoleDto: any) {
        try {
            throw new Error('Not implemented');
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException(error.message);
        }
    }
}
