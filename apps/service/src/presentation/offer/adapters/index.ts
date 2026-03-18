import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { OfferRepository } from 'vm/offer/domain/offer.repository';
import { OfferQueryRepository } from 'vm/offer/application/query/offer-query.repository';
import { DrizzleOfferRepository } from 'vm/offer/infrastructure/persistence/drizzle-offer.repository';
import { DrizzleOfferQueryRepository } from 'vm/offer/infrastructure/drizzle-offer-query.repository';
import { GetOffersByShopQueryHandler } from 'vm/offer/application/query/get-offers-by-shop/handler';
import { CreateOfferCommandHandler } from 'vm/offer/application/command/create-offer/handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CREATE_OFFER_COMMAND_HANDLER,
    GET_OFFERS_BY_SHOP_QUERY_HANDLER,
    OFFER_QUERY_REPOSITORY,
    OFFER_REPOSITORY,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const offerRepositoryProvider: Provider = {
    provide: OFFER_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleOfferRepository(database),
    scope: Scope.DEFAULT,
};

export const createOfferCommandHandlerProvider: Provider = {
    provide: CREATE_OFFER_COMMAND_HANDLER,
    inject: [OFFER_REPOSITORY],
    useFactory: (offerRepository: OfferRepository) =>
        new CreateOfferCommandHandler(offerRepository),
    scope: Scope.DEFAULT,
};

export const offerQueryRepositoryProvider: Provider = {
    provide: OFFER_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleOfferQueryRepository(database),
    scope: Scope.DEFAULT,
};

export const getOffersByShopQueryHandlerProvider: Provider = {
    provide: GET_OFFERS_BY_SHOP_QUERY_HANDLER,
    inject: [OFFER_QUERY_REPOSITORY],
    useFactory: (offerQueryRepository: OfferQueryRepository) =>
        new GetOffersByShopQueryHandler(offerQueryRepository),
    scope: Scope.DEFAULT,
};
