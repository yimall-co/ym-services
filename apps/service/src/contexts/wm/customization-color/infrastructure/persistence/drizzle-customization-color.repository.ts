import { eq } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { CustomizationColorId } from 'wm/shared/domain/customization-color-id';
import { CustomizationColor } from 'wm/customization-color/domain/customization-color';
import { CustomizationColorRepository } from 'wm/customization-color/domain/customization-color.repository';

import { customizationColors } from './drizzle/customization-colors.table';
import { CustomizationColorMapper } from '../mapper/customization-color.mapper';

export class DrizzleCustomizationColorRepository
    extends DrizzleRepository<typeof customizationColors>
    implements CustomizationColorRepository {
    protected readonly table = customizationColors;

    async save(customizationColor: CustomizationColor): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, customizationId, ...rest } =
                CustomizationColorMapper.toPersistence(customizationColor);

            await tx
                .insert(this.table)
                .values(CustomizationColorMapper.toPersistence(customizationColor))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                });
        });
    }

    async update(id: CustomizationColorId, customizationColor: CustomizationColor): Promise<void> {
        await this.client
            .update(this.table)
            .set(CustomizationColorMapper.toPersistence(customizationColor))
            .where(eq(this.table.id, id.value));
    }
}
