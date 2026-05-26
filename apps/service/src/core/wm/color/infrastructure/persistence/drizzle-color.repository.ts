import { eq } from 'drizzle-orm';

import { Uuid } from 'shared/domain/value-object/uuid';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Color } from 'wm/color/domain/color';
import { ColorRepository } from 'wm/color/domain/color.repository';

import { colors } from './drizzle/colors.table';
import { ColorMapper } from '../mapper/color.mapper';

export class DrizzleColorRepository
    extends DrizzleRepository<typeof colors>
    implements ColorRepository {
    protected readonly table = colors;

    async save(color: Color): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, customizationId, ...rest } =
                ColorMapper.toPersistence(color);

            await tx
                .insert(this.table)
                .values(ColorMapper.toPersistence(color))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                });
        });
    }

    async update(id: Uuid, color: Color): Promise<void> {
        await this.client
            .update(this.table)
            .set(ColorMapper.toPersistence(color))
            .where(eq(this.table.id, id.value));
    }
}
