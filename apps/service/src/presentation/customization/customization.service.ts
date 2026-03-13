import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CustomizationByIdDto } from 'wm/customization/application/query/get-customization-by-id/get-customization-by-id.dto';
import { GetCustomizationByIdQuery } from 'wm/customization/application/query/get-customization-by-id/get-customization-by-id.query';
import { CustomizationByWorkspaceDto } from 'wm/customization/application/query/get-customization-by-workspace/get-customization-by-workspace.dto';
import { GetCustomizationByWorkspaceQuery } from 'wm/customization/application/query/get-customization-by-workspace/get-customization-by-workspace.query';
import { CreateCustomizationColorCommand } from 'wm/customization-color/application/command/create/create-customization-color.command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateColorDto } from './dtos/create-color.dto';
import { CreateCustomizationDto } from './dtos/create-customization.dto';

@Injectable()
export class CustomizationService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getCustomizationById(id: string) {
        const query = new GetCustomizationByIdQuery(id);
        return await this.queryBus.ask<CustomizationByIdDto>(query);
    }

    async getCustomizationByWorkspace(workspaceId: string) {
        const query = new GetCustomizationByWorkspaceQuery(workspaceId);
        return await this.queryBus.ask<CustomizationByWorkspaceDto>(query);
    }

    async create(customization: CreateCustomizationDto) { }

    async createColor(customizationId: string, dto: CreateColorDto) {
        const customization = await this.getCustomizationById(customizationId);
        if (!customization) {
            throw new Error(`Associated customization id ${customization} not found`);
        }

        const { label, value, isDefault } = dto;

        const command = new CreateCustomizationColorCommand(
            label,
            value,
            isDefault,
            customizationId,
        );

        return await this.commandBus.dispatch(command);
    }
}
