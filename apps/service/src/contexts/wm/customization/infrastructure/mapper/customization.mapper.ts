import { customizationColors } from 'shared/infrastructure/persistence/drizzle/schema';

import { Customization } from 'wm/customization/domain/customization';

import { customizations } from '../persistence/drizzle/customizations.table';

type CustomizationWithColors = typeof customizations.$inferSelect & {
    colors: Array<typeof customizationColors.$inferSelect>;
};

export class CustomizationMapper {
    static toDomain(primitives: CustomizationWithColors): Customization {
        return Customization.fromPrimitives({
            ...primitives,
            colors: primitives.colors.map((color) => color.id),
        });
    }

    static toPersistence(customization: Customization): typeof customizations.$inferInsert {
        const primitives = customization.toPrimitives();

        const { colors, ...rest } = primitives;

        return {
            ...rest,
        };
    }
}
