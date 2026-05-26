/* eslint-disable prettier/prettier */
import { and, eq } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { Customization } from 'wm/customization/domain/customization';
import { CustomizationRepository } from 'wm/customization/domain/customization.repository';

import { customizations } from './drizzle/customizations.table';
import { CustomizationMapper } from '../mapper/customization.mapper';

export class DrizzleCustomizationRepository
    extends DrizzleRepository<typeof customizations>
    implements CustomizationRepository {
    protected readonly table = customizations;

    async existsByWorkspaceId(workspaceId: WorkspaceId): Promise<boolean> {
        const result = await this.client
            .select({ id: this.table.id })
            .from(this.table)
            .where(eq(this.table.workspaceId, workspaceId.value))
            .limit(1);

        return result.length > 0;
    }

    async save(customization: Customization): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, workspaceId, ...rest } = CustomizationMapper.toPersistence(customization);

            await tx
                .insert(this.table)
                .values(CustomizationMapper.toPersistence(customization))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                    targetWhere: and(),
                });

            // const colorsByCustomization = await tx
            //     .select({ colorId: customizationColors.id })
            //     .from(customizationColors)
            //     .where(eq(customizationColors.customizationId, customization.getId().value));
        });
    }
}
