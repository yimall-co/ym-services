import { Command } from 'shared/domain/command';

import { SourceValue } from 'wm/visit/domain/value-object/visit-source';

export class CreateVisitCommand extends Command {
    readonly source?: SourceValue;
    readonly userAgent?: string;
    readonly ipAddress?: string;
    readonly locale?: string;
    readonly visitedAt?: Date;
    readonly onboardingStepReached?: number;
    readonly completedOnboarding?: boolean;
    readonly isFirstVisit?: boolean;
    readonly workspaceId?: string;
    readonly visitorId?: string;

    constructor(
        source?: SourceValue,
        userAgent?: string,
        ipAddress?: string,
        locale?: string,
        visitedAt?: Date,
        onboardingStepReached?: number,
        completedOnboarding?: boolean,
        isFirstVisit?: boolean,
        workspaceId?: string,
        visitorId?: string,
    ) {
        super();

        this.source = source;
        this.userAgent = userAgent;
        this.ipAddress = ipAddress;
        this.locale = locale;
        this.visitedAt = visitedAt;
        this.onboardingStepReached = onboardingStepReached;
        this.completedOnboarding = completedOnboarding;
        this.isFirstVisit = isFirstVisit;
        this.workspaceId = workspaceId;
        this.visitorId = visitorId;
    }
}
