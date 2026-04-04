import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { Customization } from 'wm/customization/domain/customization';
import { CustomizationLogo } from 'wm/customization/domain/value-object/customization-logo';
import { CustomizationFont } from 'wm/customization/domain/value-object/customization-font';

import { CreateCustomizationResultDto } from './dto';
import { CreateCustomizationCommand } from './command';
import { CustomizationRepositoryScope } from '../../customization.repository-scope';

export class CreateCustomizationCommandHandler implements CommandHandler<
    CreateCustomizationCommand,
    CreateCustomizationResultDto
> {
    constructor(private readonly uow: UnitOfWork<CustomizationRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateCustomizationCommand;
    }

    handle(command: CreateCustomizationCommand): Promise<CreateCustomizationResultDto> {
        const customization = Customization.create(
            new CustomizationLogo(command.logo),
            new CustomizationFont(command.fontPrimary),
            new CustomizationFont(command.fontSecondary),
            new WorkspaceId(command.workspaceId),
        );

        return this.uow.withTransaction(async (scope) => {
            const customizationRepository = scope.getCustomizationRepository();

            const exists = await customizationRepository.existsByWorkspaceId(
                customization.getWorkspaceId(),
            );
            // TODO: throw a custom exception
            if (exists) {
                throw new Error('Customization by workspace id already exists');
            }

            await customizationRepository.save(customization);

            return {
                customizationId: customization.getId().value,
            };
        });
    }
}
