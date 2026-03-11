import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CustomizationByWorkspaceDto } from 'wm/customization/application/query/get-customization-by-workspace/get-customization-by-workspace.dto';
import { GetCustomizationByWorkspaceQuery } from 'wm/customization/application/query/get-customization-by-workspace/get-customization-by-workspace.query';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

@Injectable()
export class CustomizationService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getCustomizationByWorkspace(workspaceId: string) {
        const query = new GetCustomizationByWorkspaceQuery(workspaceId);

        const result = await this.queryBus.ask<CustomizationByWorkspaceDto>(query);
        return result;
    }
}
