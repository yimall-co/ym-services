import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { CustomizationRepository } from 'wm/customization/domain/customization.repository';

import { CreateCustomizationDto } from './dto';
import { CreateCustomizationCommand } from './command';

export class CreateCustomizationCommandHandler implements CommandHandler<
    CreateCustomizationCommand,
    CreateCustomizationDto
> {
    constructor(private readonly customizationRepository: CustomizationRepository) { }

    subscribedTo(): Command {
        return CreateCustomizationCommand;
    }

    handle(command: CreateCustomizationCommand): Promise<CreateCustomizationDto> {
        throw new Error('Method not implemented.');
    }
}
