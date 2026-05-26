import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Campaign } from 'core/marketing/campaign/domain/campaign';

import { CreateCampaignCommand } from './command';
import { CreateCampaignResultDto } from './dto';
import { CampaignRepositoryScope } from '../../campaign.repository-scope';

export class CreateCampaignCommandHandler implements CommandHandler<
    CreateCampaignCommand,
    CreateCampaignResultDto
> {
    constructor(private readonly uow: UnitOfWork<CampaignRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateCampaignCommand;
    }

    async handle(command: CreateCampaignCommand): Promise<CreateCampaignResultDto> {
        const campaign = Campaign.create(
            command.name,
            command.code,
            command.type,
            command.status,
            command.startDate,
            command.endDate,
            command.workspaceId,
            command.priority,
            command.description,
        );

        return this.uow.withTransaction(async (scope) => {
            const campaignRepository = scope.getCampaignRepository();

            return {
                campaignId: campaign.getId().value,
            };
        });
    }
}
