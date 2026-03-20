import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UnprocessableEntityException,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dtos/create-permission.dto';

@Controller({
    path: 'permissions',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class PermissionController {
    private readonly logger = new Logger(PermissionController.name);

    constructor(private readonly permissionService: PermissionService) { }

    @Post()
    @ApiCreatedResponse({ description: '' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
        try {
            return await this.permissionService.createPermission(createPermissionDto);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new UnprocessableEntityException();
        }
    }
}
