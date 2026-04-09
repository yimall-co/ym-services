import { emptyToNull } from 'lib/utils';

import { Category } from 'lm/category/domain/category';

import { categories } from '../persistence/drizzle/categories.table';

export class CategoryMapper {
    static toDomain(primitives: typeof categories.$inferSelect): Category {
        return Category.fromPrimitives({
            ...primitives,
            description: primitives.description ?? '',
            banner: primitives.banner ?? '',
        });
    }

    static toPersistence(category: Category): typeof categories.$inferInsert {
        const primitives = category.toPrimitives();

        return {
            ...primitives,
            description: emptyToNull(primitives.description),
            banner: emptyToNull(primitives.banner),
        };
    }
}
