import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Post,
    Put,
    UnprocessableEntityException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiCreatedResponse, ApiParam, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AddPermissionToRoleDto } from './dtos/add-permission-to-role.dto';

@Controller({
    path: 'roles',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class RoleController {
    private readonly logger = new Logger(RoleController.name);

    constructor(private readonly roleService: RoleService) { }

    @Post()
    // @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: 'Role created successfully' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createRole(@Body() createRoleDto: CreateRoleDto) {
        try {
            return await this.roleService.createRole(createRoleDto);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException();
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', description: 'Role ID' })
    @ApiCreatedResponse({ description: 'Role updated successfully' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async updateRole(@Param('id') id: string, @Body() updateRoleDto: any) {
        try {
            return await this.roleService.updateRole();
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException(error.message);
        }
    }

    @Post(':id/permissions')
    // @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', description: 'Role ID' })
    @ApiCreatedResponse({ description: 'Permission added to role successfully' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async addPermissionToRole(
        @Param('id') roleId: string,
        @Body() addPermissionToRoleDto: AddPermissionToRoleDto,
    ) {
        try {
            return await this.roleService.addPermissionToRole(roleId, addPermissionToRoleDto);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException();
        }
    }
}
