import { Color } from 'wm/color/domain/color';

import { colors } from '../persistence/drizzle/colors.table';

export class ColorMapper {
    static toDomain(row: typeof colors.$inferSelect): Color {
        return Color.fromPrimitives({
            id: row.id,
            label: row.label,
            value: row.value,
            isDefault: row.isDefault ?? true,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            customizationId: row.customizationId,
        });
    }

    static toPersistence(color: Color): typeof colors.$inferInsert {
        const primitives = color.toPrimitives();

        return {
            ...primitives,
            isDefault: primitives.isDefault ?? true,
        };
    }
}
