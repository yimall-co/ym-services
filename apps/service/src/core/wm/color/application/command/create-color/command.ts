/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';

import { ColorVariant } from 'wm/color/domain/enum/color-variants';

export class CreateColorCommand extends Command {
    readonly label: string;
    readonly value: ColorVariant;
    readonly isDefault: boolean;
    readonly customizationId: string;

    constructor(
        label: string,
        value: ColorVariant,
        isDefault: boolean,
        customizationId: string
    ) {
        super();

        this.label = label;
        this.value = value;
        this.isDefault = isDefault;
        this.customizationId = customizationId;
    }
}
