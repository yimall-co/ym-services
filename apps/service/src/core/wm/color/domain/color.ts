import { Uuid } from 'shared/domain/value-object/uuid';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';
import { AggregateRoot } from 'shared/domain/aggregate-root';

import { ColorVariant } from './enum/color-variants';
import { ColorLabel } from './value-object/color-label';
import { ColorValue } from './value-object/color-value';

export interface ColorPrimitives {
    id: string;
    label: string;
    value: ColorVariant;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    customizationId: string;
}

export class Color extends AggregateRoot<ColorPrimitives> {
    private readonly id: Uuid;
    private label: ColorLabel;
    private value: ColorValue;
    private isDefault: boolean;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private customizationId: Uuid;

    constructor(
        id: Uuid,
        label: ColorLabel,
        value: ColorValue,
        isDefault: boolean,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        customizationId: Uuid,
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

    static create(
        label: ColorLabel,
        value: ColorValue,
        isDefault: boolean,
        customizationId: Uuid,
    ): Color {
        return new Color(
            Uuid.random(),
            label,
            value,
            isDefault,
            CreatedAt.now(),
            UpdatedAt.now(),
            customizationId,
        );
    }

    static fromPrimitives(primitives: ColorPrimitives): Color {
        return new Color(
            new Uuid(primitives.id),
            new ColorLabel(primitives.label),
            new ColorValue(primitives.value),
            primitives.isDefault,
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.customizationId),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    toPrimitives(): ColorPrimitives {
        return {
            id: this.id.value,
            label: this.label.value,
            value: this.value.value,
            isDefault: this.isDefault,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            customizationId: this.customizationId.value,
        };
    }

    private touch(): void {
        this.updatedAt = UpdatedAt.now();
    }
}
