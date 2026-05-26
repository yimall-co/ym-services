import { Command } from 'shared/domain/command';

import { CampaignTypes } from 'core/marketing/campaign/domain/enum/campaign-types';
import { CampaignStatuses } from 'core/marketing/campaign/domain/enum/campaign-statuses';

export class CreateCampaignCommand extends Command {
    readonly name: string;
    readonly code: string;
    readonly description?: string;
    readonly type: CampaignTypes;
    readonly status: CampaignStatuses;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly priority?: number;
    readonly workspaceId: string;

    constructor(
        name: string,
        code: string,
        description: string,
        type: CampaignTypes,
        status: CampaignStatuses,
        startDate: Date,
        endDate: Date,
        priority: number,
        workspaceId: string,
    ) {
        super();
        this.name = name;
        this.code = code;
        this.description = description;
        this.type = type;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.workspaceId = workspaceId;
    }
}
