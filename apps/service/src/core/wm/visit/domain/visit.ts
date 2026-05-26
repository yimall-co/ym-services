import { AggregateRoot } from 'shared/domain/aggregate-root';

import { VisitId } from 'wm/shared/domain/visit-id';

import { SourceValue, VisitSource } from './value-object/visit-source';
import { VisitUserAgent } from './value-object/visit-user-agent';
import { VisitIpAddress } from './value-object/visit-ip-address';
import { VisitLocale } from './value-object/visit-locale';
import { VisitVisitedAt } from './value-object/visit-visited-at';
import { VisitOnboardingStepReached } from './value-object/visit-onboarding-step-reached';
import { VisitCompletedOnboarding } from './value-object/visit-completed-onboarding';
import { VisitIsFirstVisit } from './value-object/visit-is-first-visit';
import { VisitCreatedAt } from './value-object/visit-created-at';
import { VisitUpdatedAt } from './value-object/visit-updated-at';
import { VisitVisitorId } from './value-object/visit-visitor-id';
import { VisitWorkspaceId } from './value-object/visit-workspace-id';

export interface VisitPrimitives {
    id: string;
    source: SourceValue;
    userAgent: string;
    ipAddress: string;
    locale: string;
    visitedAt: Date;
    onboardingStepReached: number;
    completedOnboarding: boolean;
    isFirstVisit: boolean;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
    visitorId: string;
}

export class Visit extends AggregateRoot<VisitPrimitives> {
    private readonly id: VisitId;
    private source: VisitSource;
    private userAgent: VisitUserAgent;
    private ipAddress: VisitIpAddress;
    private locale: VisitLocale;
    private visitedAt: VisitVisitedAt;
    private onboardingStepReached: VisitOnboardingStepReached;
    private completedOnboarding: VisitCompletedOnboarding;
    private isFirstVisit: VisitIsFirstVisit;
    private readonly createdAt: VisitCreatedAt;
    private updatedAt: VisitUpdatedAt;
    private workspaceId: VisitWorkspaceId;
    private visitorId: VisitVisitorId;

    constructor(
        id: VisitId,
        source: VisitSource,
        userAgent: VisitUserAgent,
        ipAddress: VisitIpAddress,
        locale: VisitLocale,
        visitedAt: VisitVisitedAt,
        onboardingStepReached: VisitOnboardingStepReached,
        completedOnboarding: VisitCompletedOnboarding,
        isFirstVisit: VisitIsFirstVisit,
        createdAt: VisitCreatedAt,
        updatedAt: VisitUpdatedAt,
        workspaceId: VisitWorkspaceId,
        visitorId: VisitVisitorId,
    ) {
        super();

        this.id = id;
        this.source = source;
        this.userAgent = userAgent;
        this.ipAddress = ipAddress;
        this.locale = locale;
        this.visitedAt = visitedAt;
        this.onboardingStepReached = onboardingStepReached;
        this.completedOnboarding = completedOnboarding;
        this.isFirstVisit = isFirstVisit;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.workspaceId = workspaceId;
        this.visitorId = visitorId;
    }

    static create(
        source: VisitSource,
        userAgent: VisitUserAgent,
        ipAddress: VisitIpAddress,
        locale: VisitLocale,
        visitedAt: VisitVisitedAt,
        onboardingStepReached: VisitOnboardingStepReached,
        completedOnboarding: VisitCompletedOnboarding,
        isFirstVisit: VisitIsFirstVisit,
        workspaceId: VisitWorkspaceId,
        visitorId: VisitVisitorId,
    ): Visit {
        const visit = new Visit(
            VisitId.random(),
            source,
            userAgent,
            ipAddress,
            locale,
            visitedAt,
            onboardingStepReached,
            completedOnboarding,
            isFirstVisit,
            new VisitCreatedAt(new Date()),
            new VisitUpdatedAt(new Date()),
            workspaceId,
            visitorId,
        );

        // visit.record();

        return visit;
    }

    static fromPrimitives(primitives: VisitPrimitives): Visit {
        return new Visit(
            new VisitId(primitives.id),
            new VisitSource(primitives.source),
            new VisitUserAgent(primitives.userAgent),
            new VisitIpAddress(primitives.ipAddress),
            new VisitLocale(primitives.locale),
            new VisitVisitedAt(primitives.visitedAt),
            new VisitOnboardingStepReached(primitives.onboardingStepReached),
            new VisitCompletedOnboarding(primitives.completedOnboarding),
            new VisitIsFirstVisit(primitives.isFirstVisit),
            new VisitCreatedAt(primitives.createdAt),
            new VisitUpdatedAt(primitives.updatedAt),
            new VisitWorkspaceId(primitives.workspaceId),
            new VisitVisitorId(primitives.visitorId),
        );
    }

    getId(): VisitId {
        return this.id;
    }

    toPrimitives(): VisitPrimitives {
        return {
            id: this.id.value,
            source: this.source.value,
            userAgent: this.userAgent.value,
            ipAddress: this.ipAddress.value,
            locale: this.locale.value,
            visitedAt: this.visitedAt.value,
            onboardingStepReached: this.onboardingStepReached.value,
            completedOnboarding: this.completedOnboarding.value,
            isFirstVisit: this.isFirstVisit.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            workspaceId: this.workspaceId.value,
            visitorId: this.visitorId.value,
        };
    }
}
