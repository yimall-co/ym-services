/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Param,
    Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

import { ShopService } from './shop.service';

@Controller({
    path: 'shops',
    version: '1',
})
export class ShopController {
    private readonly logger = new Logger(ShopController.name);

    constructor(private readonly shopService: ShopService) { }

    @Get('slug/:slug')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getShopBySlug(
        @Param('slug') slug: string,
        @Query('workspaceId') workspaceId: string
    ) {
        try {
            return await this.shopService.getShopBySlug(slug, workspaceId);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get('workspace/:workspaceId')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getShopsByWorkspace(@Param('workspaceId') workspaceId: string) {
        try {
            return await this.shopService.getShopsByWorkspace(workspaceId);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }
}
