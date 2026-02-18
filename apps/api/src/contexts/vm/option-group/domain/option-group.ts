import { AggregateRoot } from "shared/domain/aggregate-root";

import { OptionGroupId } from "vm/shared/domain/option-group-id";

import { OptionGroupName } from "./value-object/option-group-name";
import { OptionGroupDescription } from "./value-object/option-group-description";
import { OptionGroupRequired } from "./value-object/option-group-required";
import { OptionGroupMin } from "./value-object/option-group-min";
import { OptionGroupMax } from "./value-object/option-group-max";
import { OptionGroupCreatedAt } from "./value-object/option-group-created-at";
import { OptionGroupUpdatedAt } from "./value-object/option-group-updated-at";

export interface OptionGroupPrimitives {
    id: string;
    name: string;
    description: string;
    required: boolean;
    min: number;
    max: number;
    createdAt: Date;
    updatedAt: Date;
}

export class OptionGroup extends AggregateRoot {
    readonly id: OptionGroupId;
    readonly name: OptionGroupName;
    readonly description: OptionGroupDescription;
    readonly required: OptionGroupRequired;
    readonly min: OptionGroupMin;
    readonly max: OptionGroupMax;
    readonly createdAt: OptionGroupCreatedAt;
    readonly updatedAt: OptionGroupUpdatedAt;

    constructor(
        id: OptionGroupId,
        name: OptionGroupName,
        description: OptionGroupDescription,
        required: OptionGroupRequired,
        min: OptionGroupMin,
        max: OptionGroupMax,
        createdAt: OptionGroupCreatedAt,
        updatedAt: OptionGroupUpdatedAt,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.description = description;
        this.required = required;
        this.min = min;
        this.max = max;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromPrimitives(primitives: OptionGroupPrimitives): OptionGroup {
        return new OptionGroup(
            new OptionGroupId(primitives.id),
            new OptionGroupName(primitives.name),
            new OptionGroupDescription(primitives.description),
            new OptionGroupRequired(primitives.required),
            new OptionGroupMin(primitives.min),
            new OptionGroupMax(primitives.max),
            new OptionGroupCreatedAt(primitives.createdAt),
            new OptionGroupUpdatedAt(primitives.updatedAt),
        );
    }

    toPrimitives(): OptionGroupPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            description: this.description.value,
            required: this.required.value,
            min: this.min.value,
            max: this.max.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}