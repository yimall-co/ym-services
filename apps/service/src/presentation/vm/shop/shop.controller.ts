/* eslint-disable prettier/prettier */
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
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { ShopBySlugDto } from 'vm/shop/application/query/get-shop-by-slug/dto';
import { GetShopBySlugQuery } from 'vm/shop/application/query/get-shop-by-slug/query';
import { ShopByWorkspaceDto } from 'vm/shop/application/query/get-shops-by-workspace/dto';
import { GetShopsByWorkspaceQuery } from 'vm/shop/application/query/get-shops-by-workspace/query';
import { CreateShopCommand } from 'vm/shop/application/command/create-shop/command';
import { CreateShopResultDto } from 'vm/shop/application/command/create-shop/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';
import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { CreateShopDto } from './dtos/create-shop.dto';

@Controller({
    path: 'shops',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class ShopController {
    private readonly logger = new Logger(ShopController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Get('slug/:slug')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getShopBySlug(
        @Param('slug') slug: string,
        @Query('workspaceId') workspaceId: string
    ) {
        try {
            const query = new GetShopBySlugQuery(slug, workspaceId);
            return await this.queryBus.ask<ShopBySlugDto>(query);
        } catch (error: any) {
            this.logger.error(error);
            throw new NotFoundException();
        }
    }

    @Get('workspace/:workspaceId')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getShopsByWorkspace(@Param('workspaceId') workspaceId: string) {
        try {
            const query = new GetShopsByWorkspaceQuery(workspaceId);
            return await this.queryBus.ask<Array<ShopByWorkspaceDto>>(query);
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
    async createShop(@Body() body: CreateShopDto) {
        try {
            const { name, description, banner, phone, isPrimary, workspaceId } = body;

            const command = new CreateShopCommand(
                name,
                description ?? null,
                banner ?? null,
                phone,
                isPrimary,
                workspaceId,
            );

            return await this.commandBus.dispatch<CreateShopResultDto>(command);
        } catch (error: any) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
}
