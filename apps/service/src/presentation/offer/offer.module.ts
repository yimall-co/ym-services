import { DynamicModule, Module } from '@nestjs/common';

import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';

@Module({
    controllers: [OfferController],
    providers: [OfferService],
    exports: [],
})
export class OfferModule {
    static forRoot(): DynamicModule {
        return {
            module: OfferModule,
        };
    }
}
