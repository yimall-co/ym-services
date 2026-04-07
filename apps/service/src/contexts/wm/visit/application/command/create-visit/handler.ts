import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { Visit } from 'wm/visit/domain/visit';
import { VisitSource } from 'wm/visit/domain/value-object/visit-source';
import { VisitUserAgent } from 'wm/visit/domain/value-object/visit-user-agent';
import { VisitIpAddress } from 'wm/visit/domain/value-object/visit-ip-address';
import { VisitLocale } from 'wm/visit/domain/value-object/visit-locale';
import { VisitVisitedAt } from 'wm/visit/domain/value-object/visit-visited-at';
import { VisitOnboardingStepReached } from 'wm/visit/domain/value-object/visit-onboarding-step-reached';
import { VisitCompletedOnboarding } from 'wm/visit/domain/value-object/visit-completed-onboarding';
import { VisitIsFirstVisit } from 'wm/visit/domain/value-object/visit-is-first-visit';
import { VisitWorkspaceId } from 'wm/visit/domain/value-object/visit-workspace-id';
import { VisitVisitorId } from 'wm/visit/domain/value-object/visit-visitor-id';

import { CreateVisitCommand } from './command';
import { CreateVisitResultDto } from './dto';
import { VisitRepositoryScope } from '../../visit.repository-scope';

export class CreateVisitCommandHandler implements CommandHandler<
    CreateVisitCommand,
    CreateVisitResultDto
> {
    constructor(private readonly uow: UnitOfWork<VisitRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateVisitCommand;
    }

    async handle(command: CreateVisitCommand): Promise<CreateVisitResultDto> {
        const visit = Visit.create(
            new VisitSource(command.source ?? 'unknown'),
            new VisitUserAgent(command.userAgent ?? ''),
            new VisitIpAddress(command.ipAddress ?? ''),
            new VisitLocale(command.locale ?? ''),
            new VisitVisitedAt(command.visitedAt ?? new Date()),
            new VisitOnboardingStepReached(command.onboardingStepReached ?? 1),
            new VisitCompletedOnboarding(command.completedOnboarding ?? false),
            new VisitIsFirstVisit(command.isFirstVisit ?? true),
            command.workspaceId
                ? VisitWorkspaceId.some(command.workspaceId)
                : VisitWorkspaceId.none(),
            command.visitorId ? VisitVisitorId.some(command.visitorId) : VisitVisitorId.none(),
        );

        return this.uow.withTransaction(async (scope) => {
            const visitRepository = scope.getVisitRepository();

            await visitRepository.save(visit);

            return {
                visitId: visit.getId().value,
            };
        });
    }
}
