import { AggregateRoot } from "shared/domain/aggregate-root";

import { OfferId } from "vm/shared/domain/offer-id";
import { OptionGroupId } from "vm/shared/domain/option-group-id";

import { OfferOptionGroupSortOrder } from "./value-object/offer-option-group-sort-order";
import { OfferOptionGroupCreatedAt } from "./value-object/offer-option-group-created-at";
import { OfferOptionGroupUpdatedAt } from "./value-object/offer-option-group-updated-at";

export interface OfferOptionGroupPrimitives {
    offerId: string;
    optionGroupId: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export class OfferOptionGroup extends AggregateRoot {
    readonly offerId: OfferId;
    readonly optionGroupId: OptionGroupId;
    readonly sortOrder: OfferOptionGroupSortOrder;
    readonly createdAt: OfferOptionGroupCreatedAt;
    readonly updatedAt: OfferOptionGroupUpdatedAt;

    constructor(
        offerId: OfferId,
        optionGroupId: OptionGroupId,
        sortOrder: OfferOptionGroupSortOrder,
        createdAt: OfferOptionGroupCreatedAt,
        updatedAt: OfferOptionGroupUpdatedAt,
    ) {
        super();

        this.offerId = offerId;
        this.optionGroupId = optionGroupId;
        this.sortOrder = sortOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromPrimitives(primitives: OfferOptionGroupPrimitives): OfferOptionGroup {
        return new OfferOptionGroup(
            new OfferId(primitives.offerId),
            new OptionGroupId(primitives.optionGroupId),
            new OfferOptionGroupSortOrder(primitives.sortOrder),
            new OfferOptionGroupCreatedAt(primitives.createdAt),
            new OfferOptionGroupUpdatedAt(primitives.updatedAt),
        );
    }

    toPrimitives(): OfferOptionGroupPrimitives {
        return {
            offerId: this.offerId.value,
            optionGroupId: this.optionGroupId.value,
            sortOrder: this.sortOrder.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}