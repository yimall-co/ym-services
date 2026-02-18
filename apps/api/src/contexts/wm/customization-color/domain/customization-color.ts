import { AggregateRoot } from 'shared/domain/aggregate-root';

import { CustomizationId } from 'wm/shared/domain/customization-id';
import { CustomizationColorId } from 'wm/shared/domain/customization-color-id';

import { CustomizationColorLabel } from './value-object/customization-color-label';
import { CustomizationColorIsDefault } from './value-object/customization-color-is-default';
import { CustomizationColorValue } from './value-object/customization-color-value';
import { CustomizationColorCreatedAt } from './value-object/customization-color-created-at';
import { CustomizationColorUpdatedAt } from './value-object/customization-color-updated-at';

export interface CustomizationColorPrimitives {
    id: string;
    label: string;
    value: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    customizationId: string;
}

export class CustomizationColor extends AggregateRoot {
    readonly id: CustomizationColorId;
    readonly label: CustomizationColorLabel;
    readonly value: CustomizationColorValue;
    readonly isDefault: CustomizationColorIsDefault;
    readonly createdAt: CustomizationColorCreatedAt;
    readonly updatedAt: CustomizationColorUpdatedAt;
    readonly customizationId: CustomizationId;

    constructor(
        id: CustomizationColorId,
        label: CustomizationColorLabel,
        value: CustomizationColorValue,
        isDefault: CustomizationColorIsDefault,
        createdAt: CustomizationColorCreatedAt,
        updatedAt: CustomizationColorUpdatedAt,
        customizationId: CustomizationId,
    ) {
        super();

        this.id = id;
        this.label = label;
        this.value = value;
        this.isDefault = isDefault;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.customizationId = customizationId;
    }

    static fromPrimitives(primitives: CustomizationColorPrimitives): CustomizationColor {
        return new CustomizationColor(
            new CustomizationColorId(primitives.id),
            new CustomizationColorLabel(primitives.label),
            new CustomizationColorValue(primitives.value),
            new CustomizationColorIsDefault(primitives.isDefault),
            new CustomizationColorCreatedAt(primitives.createdAt),
            new CustomizationColorUpdatedAt(primitives.updatedAt),
            new CustomizationId(primitives.customizationId),
        );
    }

    toPrimitives(): CustomizationColorPrimitives {
        return {
            id: this.id.value,
            label: this.label.value,
            value: this.value.value,
            isDefault: this.isDefault.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            customizationId: this.customizationId.value,
        };
    }
}