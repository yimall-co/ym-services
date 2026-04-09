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
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CategoryByIdDto } from 'lm/category/application/query/get-category-by-id/dto';
import { GetCategoryByIdQuery } from 'lm/category/application/query/get-category-by-id/query';
import { CategoryBySlugDto } from 'lm/category/application/query/get-category-by-slug/dto';
import { GetCategoryBySlugQuery } from 'lm/category/application/query/get-category-by-slug/query';
import { CategoryByWorkspaceIdDto } from 'lm/category/application/query/get-categories-by-workspace-id/dto';
import { GetCategoriesByWorkspaceIdQuery } from 'lm/category/application/query/get-categories-by-workspace-id/query';
import { CreateCategoryResultDto } from 'lm/category/application/command/create-category/dto';
import { CreateCategoryCommand } from 'lm/category/application/command/create-category/command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';
import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller({
    path: 'categories',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Get(':id')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOneById(@Param('id') id: string) {
        try {
            const query = new GetCategoryByIdQuery(id);
            return await this.queryBus.ask<CategoryByIdDto>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get('slug/:slug')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOneBySlug(@Param('slug') slug: string) {
        try {
            const query = new GetCategoryBySlugQuery(slug);
            return await this.queryBus.ask<CategoryBySlugDto>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get('workspace/:workspaceId')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getCategoriesByWorkspace(@Param('workspaceId') workspaceId: string) {
        try {
            const query = new GetCategoriesByWorkspaceIdQuery(workspaceId);
            return await this.queryBus.ask<Array<CategoryByWorkspaceIdDto>>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateCategoryDto) {
        try {
            const { label, description, banner, position, workspaceId } = body;

            const command = new CreateCategoryCommand(
                label,
                description ?? null,
                banner ?? null,
                position ?? 0,
                workspaceId,
            );

            return await this.commandBus.dispatch<CreateCategoryResultDto>(command);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }
}
