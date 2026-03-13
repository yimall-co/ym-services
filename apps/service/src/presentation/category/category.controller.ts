import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Param,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

import { CategoryService } from './category.service';

@Controller({
    path: 'categories',
    version: '1',
})
export class CategoryController {
    private readonly logger: Logger = new Logger('CategoryController');

    constructor(private readonly categoryService: CategoryService) { }

    @Get(':id')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOneById(@Param('id') id: string) {
        try {
            return await this.categoryService.getCategoryById(id);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException(error.message);
        }
    }

    @Get('slug/:slug')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getOneBySlug(@Param('slug') slug: string) {
        try {
            return await this.categoryService.getCategoryBySlug(slug);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException(error.message);
        }
    }
}
