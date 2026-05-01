import { Module } from '@nestjs/common';

import { CategoryModule } from './category/category.module';
import { OfferModule } from './offer/offer.module';
import { ShopModule } from './shop/shop.module';

@Module({
    imports: [CategoryModule, OfferModule, ShopModule],
    exports: [CategoryModule, OfferModule, ShopModule],
})
export class VenueManagementModule { }
