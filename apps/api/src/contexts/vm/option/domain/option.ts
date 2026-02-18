import { AggregateRoot } from "shared/domain/aggregate-root";

import { OptionId } from "vm/shared/domain/option-id";
import { OptionGroupId } from "vm/shared/domain/option-group-id";

import { OptionName } from "./value-object/option-name";
import { OptionPriceDelta } from "./value-object/option-price-delta";
import { OptionIsActive } from "./value-object/option-is-active";
import { OptionCreatedAt } from "./value-object/option-created-at";
import { OptionUpdatedAt } from "./value-object/option-updated-at";

export interface OptionPrimitives {
    id: string;
    name: string;
    priceDelta: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    optionGroupId: string;
}

export class Option extends AggregateRoot {
    readonly id: OptionId;
    readonly name: OptionName;
    readonly priceDelta: OptionPriceDelta;
    readonly isActive: OptionIsActive;
    readonly createdAt: OptionCreatedAt;
    readonly updatedAt: OptionUpdatedAt;
    readonly optionGroupId: OptionGroupId;

    constructor(
        id: OptionId,
        name: OptionName,
        priceDelta: OptionPriceDelta,
        isActive: OptionIsActive,
        createdAt: OptionCreatedAt,
        updatedAt: OptionUpdatedAt,
        optionGroupId: OptionGroupId,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.priceDelta = priceDelta;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.optionGroupId = optionGroupId;
    }

    static fromPrimitives(primitives: OptionPrimitives): Option {
        return new Option(
            new OptionId(primitives.id),
            new OptionName(primitives.name),
            new OptionPriceDelta(primitives.priceDelta),
            new OptionIsActive(primitives.isActive),
            new OptionCreatedAt(primitives.createdAt),
            new OptionUpdatedAt(primitives.updatedAt),
            new OptionGroupId(primitives.optionGroupId),
        );
    }

    toPrimitives(): OptionPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            priceDelta: this.priceDelta.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            optionGroupId: this.optionGroupId.value,
        };
    }
}