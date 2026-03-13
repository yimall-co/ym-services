import { CustomizationColor } from 'wm/customization-color/domain/customization-color';

import { customizationColors } from '../persistence/drizzle/customization-colors.table';

export class CustomizationColorMapper {
    static toDomain(row: typeof customizationColors.$inferSelect): CustomizationColor {
        return CustomizationColor.fromPrimitives({
            id: row.id,
            label: row.label,
            value: row.value,
            isDefault: row.isDefault ?? true,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            customizationId: row.customizationId,
        });
    }

    static toPersistence(
        customizationColor: CustomizationColor,
    ): typeof customizationColors.$inferInsert {
        const primitives = customizationColor.toPrimitives();

        return {
            ...primitives,
            isDefault: primitives.isDefault ?? true,
        };
    }
}
