import { Visit } from 'wm/visit/domain/visit';

import { visits } from '../persistence/drizzle/visits.table';
import { emptyToNull } from 'lib/utils';

export class VisitMapper {
    static toDomain(primitives: typeof visits.$inferSelect): Visit {
        return Visit.fromPrimitives({
            ...primitives,
            source: primitives.source ?? 'unknown',
            userAgent: primitives.userAgent ?? '',
            ipAddress: primitives.ipAddress ?? '',
            locale: primitives.locale ?? '',
            visitedAt: primitives.visitedAt ?? new Date(),
            onboardingStepReached: primitives.onboardingStepReached ?? 0,
            completedOnboarding: primitives.completedOnboarding ?? false,
            isFirstVisit: primitives.isFirstVisit ?? true,
            createdAt: primitives.createdAt ?? new Date(),
            updatedAt: primitives.updatedAt ?? new Date(),
            workspaceId: primitives.workspaceId ?? '',
            visitorId: primitives.visitorId ?? '',
        });
    }

    static toPersistence(visit: Visit): typeof visits.$inferInsert {
        const primitives = visit.toPrimitives();

        return {
            ...primitives,
            source: emptyToNull(primitives.source),
            userAgent: emptyToNull(primitives.userAgent),
            ipAddress: emptyToNull(primitives.ipAddress),
            locale: emptyToNull(primitives.locale),
            onboardingStepReached: emptyToNull(primitives.onboardingStepReached),
            completedOnboarding: emptyToNull(primitives.completedOnboarding),
            isFirstVisit: primitives.isFirstVisit ?? null,
            workspaceId: emptyToNull(primitives.workspaceId),
            visitorId: emptyToNull(primitives.visitorId),
        };
    }
}
