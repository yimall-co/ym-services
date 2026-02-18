import { AggregateRoot } from "shared/domain/aggregate-root";

import { OfferId } from "vm/shared/domain/offer-id";
import { ShopId } from "vm/shared/domain/shop-id";

import { ShopOfferCreatedAt } from "./value-object/shop-offer-created-at";
import { ShopOfferUpdatedAt } from "./value-object/shop-offer-updated-at";

export interface ShopOfferPrimitives {
    shopId: string;
    offerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ShopOffer extends AggregateRoot {
    readonly shopId: ShopId;
    readonly offerId: OfferId;
    readonly createdAt: ShopOfferCreatedAt;
    readonly updatedAt: ShopOfferUpdatedAt;

    constructor(
        shopId: ShopId,
        offerId: OfferId,
        createdAt: ShopOfferCreatedAt,
        updatedAt: ShopOfferUpdatedAt,
    ) {
        super();

        this.shopId = shopId;
        this.offerId = offerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromPrimitives(primitives: ShopOfferPrimitives): ShopOffer {
        return new ShopOffer(
            new ShopId(primitives.shopId),
            new OfferId(primitives.offerId),
            new ShopOfferCreatedAt(primitives.createdAt),
            new ShopOfferUpdatedAt(primitives.updatedAt),
        );
    }

    toPrimitives(): ShopOfferPrimitives {
        return {
            shopId: this.shopId.value,
            offerId: this.offerId.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}