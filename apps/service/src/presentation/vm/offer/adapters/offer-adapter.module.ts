import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CreateOfferCommandHandler } from 'vm/offer/application/command/create-offer/handler';
import { GetOffersByShopQueryHandler } from 'vm/offer/application/query/get-offers-by-shop/handler';
import { GetOffersByWorkspaceQueryHandler } from 'vm/offer/application/query/get-offers-by-workspace/handler';
import { DrizzleOfferRepository } from 'vm/offer/infrastructure/persistence/drizzle-offer.repository';
import { DrizzleOfferQueryRepository } from 'vm/offer/infrastructure/persistence/drizzle-offer-query.repository';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    OFFER_REPOSITORY,
    OFFER_QUERY_REPOSITORY,
    GET_OFFERS_BY_SHOP_QUERY_HANDLER,
    CREATE_OFFER_COMMAND_HANDLER,
    GET_OFFERS_BY_WORKSPACE_QUERY_HANDLER,
} from './constants';

@Module({
    providers: [
        {
            provide: OFFER_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleOfferRepository(db),
            scope: Scope.REQUEST,
        },
        {
            provide: OFFER_QUERY_REPOSITORY,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (db: NodePgDatabase<Schema>) => new DrizzleOfferQueryRepository(db),
            scope: Scope.REQUEST,
        },
        {
            provide: GET_OFFERS_BY_SHOP_QUERY_HANDLER,
            inject: [OFFER_QUERY_REPOSITORY],
            useFactory: (offerQueryRepository: DrizzleOfferQueryRepository) =>
                new GetOffersByShopQueryHandler(offerQueryRepository),
            scope: Scope.REQUEST,
        },
        {
            provide: GET_OFFERS_BY_WORKSPACE_QUERY_HANDLER,
            inject: [OFFER_QUERY_REPOSITORY],
            useFactory: (offerQueryRepository: DrizzleOfferQueryRepository) =>
                new GetOffersByWorkspaceQueryHandler(offerQueryRepository),
            scope: Scope.REQUEST,
        },
        {
            provide: CREATE_OFFER_COMMAND_HANDLER,
            inject: [OFFER_REPOSITORY],
            useFactory: (offerRepository: DrizzleOfferRepository) =>
                new CreateOfferCommandHandler(offerRepository),
            scope: Scope.REQUEST,
        },
    ],
    exports: [
        OFFER_REPOSITORY,
        OFFER_QUERY_REPOSITORY,
        GET_OFFERS_BY_SHOP_QUERY_HANDLER,
        GET_OFFERS_BY_WORKSPACE_QUERY_HANDLER,
        CREATE_OFFER_COMMAND_HANDLER,
    ],
})
export class OfferAdapterModule { }
