import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { CustomizationId } from 'wm/shared/domain/customization-id';
import { CustomizationColor } from 'wm/customization-color/domain/customization-color';
import { CustomizationColorLabel } from 'wm/customization-color/domain/value-object/customization-color-label';
import { CustomizationColorValue } from 'wm/customization-color/domain/value-object/customization-color-value';
import { CustomizationColorIsDefault } from 'wm/customization-color/domain/value-object/customization-color-is-default';

import { CreateCustomizationColorCommand } from './command';
import { CreateCustomizationColorResultDto } from './dto';
import { CustomizationColorRepositoryScope } from '../../customization-color.repository-scope';

export class CreateCustomizationColorCommandHandler implements CommandHandler<
    CreateCustomizationColorCommand,
    CreateCustomizationColorResultDto
> {
    constructor(private readonly uow: UnitOfWork<CustomizationColorRepositoryScope>) { }

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

        return this.uow.withTransaction(async (scope) => {
            const customizationColorRepository = scope.getCustomizationColorRepository();

            await customizationColorRepository.save(customizationColor);

            return {
                customizationColorId: customizationColor.getId().value,
            };
        });
    }
}
