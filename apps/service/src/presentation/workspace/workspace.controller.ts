import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
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
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { UpdateWorkspaceDto } from './dtos/update-workspace.dto';

@Controller({
    path: 'workspaces',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class WorkspaceController {
    private readonly logger = new Logger(WorkspaceController.name);

    constructor(private readonly workspaceService: WorkspaceService) { }

    @Get()
    @ApiOkResponse({ description: 'List of workspaces' })
    @ApiNotFoundResponse({ description: 'Workspaces not found' })
    @HttpCode(HttpStatus.OK)
    async getAll(@Query('top') top: number, @Query('skip') skip: number) {
        try {
            return await this.workspaceService.getAllWorkspaces(top, skip);
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
            return await this.workspaceService.getWorkspaceById(id);
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
            return await this.workspaceService.getStatistics(id);
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
            return await this.workspaceService.getWorkspaceCategoriesById(workspaceId);
        } catch (error: any) {
            this.logger.error(error.message);
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
            await this.workspaceService.createWorkspace(createWorkspaceDto);
            return { message: 'Workspace created successfully' };
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
            await this.workspaceService.updateWorkspace(id, updateWorkspaceDto);
            return { message: 'Workspace updated successfully' };
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
