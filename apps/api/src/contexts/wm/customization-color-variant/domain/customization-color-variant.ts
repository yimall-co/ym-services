import { AggregateRoot } from 'shared/domain/aggregate-root';

import { CustomizationColorId } from 'wm/shared/domain/customization-color-id';
import { CustomizationColorVariantId } from 'wm/shared/domain/customization-color-variant-id';

import { CustomizationColorVariantCode } from './value-object/customization-color-variant-code';
import { CustomizationColorVariantHex } from './value-object/customization-color-variant-hex';
import { CustomizationColorVariantR } from './value-object/customization-color-variant-r';
import { CustomizationColorVariantG } from './value-object/customization-color-variant-g';
import { CustomizationColorVariantB } from './value-object/customization-color-variant-b';
import { CustomizationColorVariantAlpha } from './value-object/customization-color-variant-alpha';
import { CustomizationColorVariantIsMain } from './value-object/customization-color-variant-is-main';
import { CustomizationColorVariantCreatedAt } from './value-object/customization-color-variant-created-at';
import { CustomizationColorVariantUpdatedAt } from './value-object/customization-color-variant-updated-at';

export interface CustomizationColorVariantPrimitives {
    id: string;
    code: string;
    hex: string;
    r: number;
    g: number;
    b: number;
    alpha: number;
    isMain: boolean;
    createdAt: Date;
    updatedAt: Date;
    colorId: string;
}

export class CustomizationColorVariant extends AggregateRoot {
    readonly id: CustomizationColorVariantId;
    readonly code: CustomizationColorVariantCode;
    readonly hex: CustomizationColorVariantHex;
    readonly r: CustomizationColorVariantR;
    readonly g: CustomizationColorVariantG;
    readonly b: CustomizationColorVariantB;
    readonly alpha: CustomizationColorVariantAlpha;
    readonly isMain: CustomizationColorVariantIsMain;
    readonly createdAt: CustomizationColorVariantCreatedAt;
    readonly updatedAt: CustomizationColorVariantUpdatedAt;
    readonly colorId: CustomizationColorId;

    constructor(
        id: CustomizationColorVariantId,
        code: CustomizationColorVariantCode,
        hex: CustomizationColorVariantHex,
        r: CustomizationColorVariantR,
        g: CustomizationColorVariantG,
        b: CustomizationColorVariantB,
        alpha: CustomizationColorVariantAlpha,
        isMain: CustomizationColorVariantIsMain,
        createdAt: CustomizationColorVariantCreatedAt,
        updatedAt: CustomizationColorVariantUpdatedAt,
        colorId: CustomizationColorId,
    ) {
        super();

        this.id = id;
        this.code = code;
        this.hex = hex;
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
        this.isMain = isMain;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.colorId = colorId;
    }

    static fromPrimitives(primitives: CustomizationColorVariantPrimitives): CustomizationColorVariant {
        return new CustomizationColorVariant(
            new CustomizationColorVariantId(primitives.id),
            new CustomizationColorVariantCode(primitives.code),
            new CustomizationColorVariantHex(primitives.hex),
            new CustomizationColorVariantR(primitives.r),
            new CustomizationColorVariantG(primitives.g),
            new CustomizationColorVariantB(primitives.b),
            new CustomizationColorVariantAlpha(primitives.alpha),
            new CustomizationColorVariantIsMain(primitives.isMain),
            new CustomizationColorVariantCreatedAt(primitives.createdAt),
            new CustomizationColorVariantUpdatedAt(primitives.updatedAt),
            new CustomizationColorId(primitives.colorId),
        );
    }

    toPrimitives(): CustomizationColorVariantPrimitives {
        return {
            id: this.id.value,
            code: this.code.value,
            hex: this.hex.value,
            r: this.r.value,
            g: this.g.value,
            b: this.b.value,
            alpha: this.alpha.value,
            isMain: this.isMain.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            colorId: this.colorId.value,
        };
    }
}