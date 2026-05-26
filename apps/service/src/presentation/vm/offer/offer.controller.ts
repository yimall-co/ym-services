import { CacheInterceptor } from '@nestjs/cache-manager';
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
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { PaginatedOffer } from 'core/sales/offer/application/query/offer-query.repository';
import { OfferByShopDto } from 'core/sales/offer/application/query/get-offers-by-shop/dto';
import { CreateOfferCommand } from 'core/sales/offer/application/command/create-offer/command';
import { CreateOfferResultDto } from 'core/sales/offer/application/command/create-offer/dto';
import { GetOffersByShopQuery } from 'core/sales/offer/application/query/get-offers-by-shop/query';
import { OfferByWorkspaceDto } from 'core/sales/offer/application/query/get-offers-by-workspace/dto';
import { GetOffersByWorkspaceQuery } from 'core/sales/offer/application/query/get-offers-by-workspace/query';

import { COMMAND_BUS, QUERY_BUS } from 'src/common/adapters/constants';

import { CreateOfferDto } from './dtos/create-offer.dto';

@ApiTags('Offers')
@Controller({
    path: 'offers',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class OfferController {
    private readonly logger = new Logger(OfferController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Get('shop/:shopId')
    @ApiParam({ name: 'shopId', required: true })
    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'updatedAt', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiOkResponse({ description: 'List of offers' })
    @ApiNotFoundResponse({ description: 'Offers not found' })
    @HttpCode(HttpStatus.OK)
    async getOffersByShop(
        @Param('shopId') shopId: string,
        @Query('id') id: string,
        @Query('limit') limit: number,
        @Query('updatedAt') updatedAt: string,
    ) {
        try {
            const query = new GetOffersByShopQuery(shopId, limit, new Date(updatedAt), id);
            return await this.queryBus.ask<PaginatedOffer<Array<OfferByShopDto>>>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get('workspace/:workspaceId')
    @ApiParam({ name: 'workspaceId', required: true })
    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'updatedAt', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    async getOffersByWorkspace(
        @Param('workspaceId') workspaceId: string,
        @Query('id') id: string,
        @Query('limit') limit: number = 10,
        @Query('updatedAt') updatedAt?: string,
    ) {
        try {
            const query = new GetOffersByWorkspaceQuery(
                workspaceId,
                limit,
                updatedAt ? new Date(updatedAt) : new Date(),
                id,
            );
            return await this.queryBus.ask<PaginatedOffer<Array<OfferByWorkspaceDto>>>(query);
        } catch (error: any) {
            this.logger.error(error);
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createOffer(@Body() body: CreateOfferDto) {
        try {
            const {
                type,
                title,
                description,
                banner,
                price,
                stock,
                discount,
                startDate,
                endDate,
                categoryId,
                subcategoryId,
                workspaceId,
            } = body;

            const command = new CreateOfferCommand(
                type,
                title,
                description,
                banner,
                price,
                stock,
                discount,
                startDate,
                endDate,
                categoryId,
                subcategoryId,
                workspaceId,
            );
            return await this.commandBus.dispatch<CreateOfferResultDto>(command);
        } catch (error: any) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
}
