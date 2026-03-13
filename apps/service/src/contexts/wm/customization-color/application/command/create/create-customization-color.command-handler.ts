import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

import { CustomizationId } from 'wm/shared/domain/customization-id';
import { CustomizationColorRepository } from 'wm/customization-color/domain/customization-color.repository';
import { CustomizationColor } from 'wm/customization-color/domain/customization-color';
import { CustomizationColorLabel } from 'wm/customization-color/domain/value-object/customization-color-label';
import { CustomizationColorValue } from 'wm/customization-color/domain/value-object/customization-color-value';
import { CustomizationColorIsDefault } from 'wm/customization-color/domain/value-object/customization-color-is-default';

import { CreateCustomizationColorCommand } from './create-customization-color.command';
import { CreateCustomizationColorResultDto } from './create-customization-color.dto';

export class CreateCustomizationColorCommandHandler implements CommandHandler<
    CreateCustomizationColorCommand,
    CreateCustomizationColorResultDto
> {
    constructor(private readonly customizationColorRepository: CustomizationColorRepository) { }

    subscribedTo(): Command {
        return CreateCustomizationColorCommand;
    }

    async handle(
        command: CreateCustomizationColorCommand,
    ): Promise<CreateCustomizationColorResultDto> {
        const customizationColor = CustomizationColor.create(
            new CustomizationColorLabel(command.label),
            new CustomizationColorValue(command.value),
            new CustomizationColorIsDefault(command.isDefault),
            new CustomizationId(command.customizationId),
        );

        await this.customizationColorRepository.save(customizationColor);

        const customizationColorId = customizationColor.getId();

        return { customizationColorId: customizationColorId.value };
    }
}
