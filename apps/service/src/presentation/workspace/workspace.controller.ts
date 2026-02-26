import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
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

@Controller('/workspaces')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) { }

    @Get()
    @ApiOkResponse({ description: 'List of workspaces' })
    @ApiNotFoundResponse({ description: 'Workspaces not found' })
    @HttpCode(HttpStatus.OK)
    async getAll(@Query('top') top: number, @Query('skip') skip: number) {
        const workspaces = await this.workspaceService.getAllWorkspaces(top, skip);
        return workspaces;
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Workspace found' })
    @ApiNotFoundResponse({ description: 'Workspace not found' })
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string) {
        const workspace = await this.workspaceService.getOneWorkspace(id);
        return workspace;
    }

    @Post()
    @ApiCreatedResponse({ description: 'Workspace created' })
    @ApiBadRequestResponse({ description: 'Cant create workspace' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
        await this.workspaceService.createWorkspace(createWorkspaceDto);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Workspace updated' })
    @ApiBadRequestResponse({ description: 'Cant update workspace' })
    @HttpCode(HttpStatus.OK)
    update(): void { }

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
