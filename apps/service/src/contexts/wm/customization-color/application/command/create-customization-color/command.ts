/* eslint-disable prettier/prettier */
import { Command } from 'shared/domain/command';

export class CreateCustomizationColorCommand extends Command {
    readonly label: string;
    readonly value: string;
    readonly isDefault: boolean;
    readonly customizationId: string;

    constructor(
        label: string,
        value: string,
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
