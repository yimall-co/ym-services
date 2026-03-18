import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { PaginatedOffer } from 'vm/offer/application/query/offer-query.repository';
import { OfferByShopDto } from 'vm/offer/application/query/get-offers-by-shop/dto';
import { GetOffersByShopQuery } from 'vm/offer/application/query/get-offers-by-shop/query';
import { CreateOfferCommand } from 'vm/offer/application/command/create-offer/command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateOfferDto } from './dtos/create-offer.dto';
import { GetOffersByShopDto } from './dtos/get-offers-by-shop.dto';

@Injectable()
export class OfferService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getOffersByShop(dto: GetOffersByShopDto) {
        const { shopId, limit, updatedAt, id } = dto;

        const query = new GetOffersByShopQuery(shopId, limit, new Date(updatedAt), id);
        return await this.queryBus.ask<PaginatedOffer<Array<OfferByShopDto>>>(query);
    }

    async createOffer(dto: CreateOfferDto) {
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
        } = dto;

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

        return await this.commandBus.dispatch(command);
    }
}
