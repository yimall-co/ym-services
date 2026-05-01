import { Module } from '@nestjs/common';

import { OfferController } from './offer.controller';
import { OfferAdapterModule } from './adapters/offer-adapter.module';

@Module({
    controllers: [OfferController],
    imports: [OfferAdapterModule],
    exports: [OfferAdapterModule],
})
export class OfferModule { }
