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
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';

import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { UpdateWorkspaceDto } from './dtos/update-workspace.dto';

@Controller({
    path: '/workspaces',
    version: '1',
})
export class WorkspaceController {
    private readonly logger: Logger = new Logger('WorkspaceController');

    constructor(private readonly workspaceService: WorkspaceService) { }

    @Get()
    @ApiOkResponse({ description: 'List of workspaces' })
    @ApiNotFoundResponse({ description: 'Workspaces not found' })
    @HttpCode(HttpStatus.OK)
    async getAll(@Query('top') top: number, @Query('skip') skip: number) {
        try {
            const workspaces = await this.workspaceService.getAllWorkspaces(top, skip);
            return workspaces;
        } catch (error) {
            this.logger.error(error);
            throw new NotFoundException();
        }
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Workspace found' })
    @ApiNotFoundResponse({ description: 'Workspace not found' })
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string) {
        try {
            const workspace = await this.workspaceService.getOneWorkspace(id);
            return workspace;
        } catch (error) {
            this.logger.error(error);
            throw new NotFoundException();
        }
    }

    @Post()
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
    @ApiOkResponse({ description: 'Workspace updated' })
    @ApiBadRequestResponse({ description: 'Cant update workspace' })
    @HttpCode(HttpStatus.OK)
    upgrade(): void { }

    @Delete(':id')
    @ApiNoContentResponse({ description: 'Workspace deleted' })
    @ApiBadRequestResponse({ description: 'Cant delete workspace' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(): void { }
}
