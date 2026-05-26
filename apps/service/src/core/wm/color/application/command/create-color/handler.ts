import { Command } from 'shared/domain/command';
import { Uuid } from 'shared/domain/value-object/uuid';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Color } from 'wm/color/domain/color';
import { ColorLabel } from 'wm/color/domain/value-object/color-label';
import { ColorValue } from 'wm/color/domain/value-object/color-value';

import { CreateColorCommand } from './command';
import { CreateColorResultDto } from './dto';
import { ColorRepositoryScope } from '../../color.repository-scope';

export class CreateColorCommandHandler implements CommandHandler<
    CreateColorCommand,
    CreateColorResultDto
> {
    constructor(private readonly uow: UnitOfWork<ColorRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateColorCommand;
    }

    async handle(command: CreateColorCommand): Promise<CreateColorResultDto> {
        const color = Color.create(
            new ColorLabel(command.label),
            new ColorValue(command.value),
            command.isDefault,
            new Uuid(command.customizationId),
        );

        return this.uow.withTransaction(async (scope) => {
            const colorRepository = scope.getColorRepository();

            await colorRepository.save(color);

            return {
                colorId: color.getId().value,
            };
        });
    }
}
