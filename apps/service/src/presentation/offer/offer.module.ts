import { DynamicModule, Module } from '@nestjs/common';

import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';

import {
    offerRepositoryProvider,
    offerQueryRepositoryProvider,
    getOffersByShopQueryHandlerProvider,
    createOfferCommandHandlerProvider,
} from './adapters';

@Module({
    controllers: [OfferController],
    providers: [
        OfferService,
        offerRepositoryProvider,
        offerQueryRepositoryProvider,
        createOfferCommandHandlerProvider,
        getOffersByShopQueryHandlerProvider,
    ],
    exports: [createOfferCommandHandlerProvider, getOffersByShopQueryHandlerProvider],
})
export class OfferModule {
    static forRoot(): DynamicModule {
        return {
            module: OfferModule,
        };
    }
}
