/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';

import { ColorValue } from 'wm/customization-color/domain/value-object/customization-color-value';

export class CreateCustomizationColorCommand extends Command {
    readonly label: string;
    readonly value: ColorValue;
    readonly isDefault: boolean;
    readonly customizationId: string;

    constructor(
        label: string,
        value: ColorValue,
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
