import {
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';

import { WorkspaceService } from './workspace.service';

@Controller('/workspaces')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(@Query('top') top: number, @Query('skip') skip: number) {
        return this.workspaceService.getAllWorkspaces();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getById(): any { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(): void { }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(): void { }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    upgrade(): void { }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(): void { }
}
