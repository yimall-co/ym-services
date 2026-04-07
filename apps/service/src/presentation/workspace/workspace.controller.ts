/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
} from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { WorkspaceDto } from 'wm/workspace/application/query/get-workspaces/dto';
import { GetWorkspacesQuery } from 'wm/workspace/application/query/get-workspaces/query';
import { PaginatedWorkspace } from 'wm/workspace/application/query/workspace-query.repository';
import { WorkspaceByIdDto } from 'wm/workspace/application/query/get-workspace-by-id/dto';
import { GetWorkspaceByIdQuery } from 'wm/workspace/application/query/get-workspace-by-id/query';
import { CategoryByWorkspaceIdDto } from 'lm/category/application/query/get-categories-by-workspace-id/dto';
import { GetCategoriesByWorkspaceIdQuery } from 'lm/category/application/query/get-categories-by-workspace-id/query';
import { GeolocationByWorkspaceDto } from 'vm/geolocation/application/query/get-geolocation-by-workspace/dto';
import { GetGeolocationByWorkspaceQuery } from 'vm/geolocation/application/query/get-geolocation-by-workspace/query';
import { CreateWorkspaceResultDto } from 'wm/workspace/application/command/create-workspace/dto';
import { CreateWorkspaceCommand } from 'wm/workspace/application/command/create-workspace/command';
import { UpdateWorkspaceResultDto } from 'wm/workspace/application/command/update-workspace/dto';
import { UpdateWorkspaceCommand } from 'wm/workspace/application/command/update-workspace/command';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';
import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { UpdateWorkspaceDto } from './dtos/update-workspace.dto';

@Controller({
    path: 'workspaces',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class WorkspaceController {
    private readonly logger = new Logger(WorkspaceController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Get()
    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'updatedAt', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiOkResponse({ description: 'List of workspaces' })
    @ApiNotFoundResponse({ description: 'Workspaces not found' })
    @HttpCode(HttpStatus.OK)
    async getAllWorkspaces(
        @Query('id') id?: string,
        @Query('updatedAt') updatedAt?: string,
        @Query('limit') limit?: number
    ) {
        try {
            const query = new GetWorkspacesQuery(
                id,
                updatedAt ? new Date(updatedAt) : undefined,
                limit,
            );

            return await this.queryBus.ask<PaginatedWorkspace<WorkspaceDto>>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Workspace found' })
    @ApiNotFoundResponse({ description: 'Workspace not found' })
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string) {
        try {
            const query = new GetWorkspaceByIdQuery(id);
            return await this.queryBus.ask<WorkspaceByIdDto>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get(':id/statistics')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getStatistics(@Param('id') id: string) {
        try {
            //TODO: implements
        } catch (error: any) {
            this.logger.error(error);
            throw new NotFoundException();
        }
    }

    @Get(':id/categories')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getCategoriesByWorkspaceId(@Param('id') workspaceId: string) {
        try {
            const query = new GetCategoriesByWorkspaceIdQuery(workspaceId);
            return await this.queryBus.ask<Array<CategoryByWorkspaceIdDto>>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get(':id/locations')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getLocationsByWorkspaceId(@Param('id') workspaceId: string) {
        try {
            const query = new GetGeolocationByWorkspaceQuery(workspaceId);
            return await this.queryBus.ask<Array<GeolocationByWorkspaceDto>>(query);
        } catch (error: any) {
            this.logger.error(error);
            throw new NotFoundException();
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: 'Workspace created' })
    @ApiBadRequestResponse({ description: 'Cant create workspace' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
        try {
            const { name, description, tin, segmentId, ownerId } = createWorkspaceDto;

            const command = new CreateWorkspaceCommand(
                name,
                description,
                tin ?? null,
                segmentId,
                ownerId,
            );
            return await this.commandBus.dispatch<CreateWorkspaceResultDto>(command);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException();
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Workspace updated' })
    @ApiBadRequestResponse({ description: 'Cant update workspace' })
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
        try {
            const { name, description } = updateWorkspaceDto;

            const command = new UpdateWorkspaceCommand(id, name, description);
            return await this.commandBus.dispatch<UpdateWorkspaceResultDto>(command);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException();
        }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Workspace updated' })
    @ApiBadRequestResponse({ description: 'Cant update workspace' })
    @HttpCode(HttpStatus.OK)
    upgrade(): void { }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiNoContentResponse({ description: 'Workspace deleted' })
    @ApiBadRequestResponse({ description: 'Cant delete workspace' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(): void { }
}
