import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users, workspaces } from 'shared/infrastructure/persistence/drizzle/schema';
import { SourceValue } from 'wm/visit/domain/value-object/visit-source';

export const visits = p.pgTable(
    'workspace_visits',
    {
        id: p.uuid('id').defaultRandom().primaryKey(),
        source: p.text('source').$type<SourceValue>(),
        userAgent: p.text('user_agent'),
        ipAddress: p.text('ip_address'),
        locale: p.text('locale'),
        visitedAt: p.timestamp('visited_at').defaultNow(),
        onboardingStepReached: p.integer('onboarding_step_reached'),
        completedOnboarding: p.boolean('completed_onboarding').default(true),
        isFirstVisit: p.boolean('is_first_visit').default(true).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p
            .timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        workspaceId: p.uuid('workspace_id').references(() => workspaces.id),
        visitorId: p.uuid('visitor_id').references(() => users.id),
    },
    (table) => [
        p.index().on(table.visitedAt),
        p.index().on(table.isFirstVisit),
        p.index().on(table.completedOnboarding),
    ],
);

export const visitsRelations = relations(visits, ({ one }) => ({
    workspace: one(workspaces, {
        fields: [visits.workspaceId],
        references: [workspaces.id],
    }),
    visitor: one(users, {
        fields: [visits.visitorId],
        references: [users.id],
    }),
}));
