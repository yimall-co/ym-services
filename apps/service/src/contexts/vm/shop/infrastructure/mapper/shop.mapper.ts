import { emptyToNull } from 'lib/utils';

import { Shop } from 'vm/shop/domain/shop';

import { shops } from '../persistence/drizzle/shops.table';

export class ShopMapper {
    static toDomain(primitives: typeof shops.$inferSelect): Shop {
        return Shop.fromPrimitives({
            id: primitives.id,
            name: primitives.name,
            slug: primitives.slug,
            description: primitives.description ?? '',
            banner: primitives.banner ?? '',
            phone: primitives.phone ?? '',
            isPrimary: primitives.isPrimary,
            isVerified: primitives.isVerified,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            workspaceId: primitives.workspaceId,
        });
    }

    static toPersistence(shop: Shop): typeof shops.$inferInsert {
        const primitives = shop.toPrimitives();

        return {
            ...primitives,
            description: emptyToNull(primitives.description),
            banner: emptyToNull(primitives.banner),
            phone: emptyToNull(primitives.phone),
            workspaceId: primitives.workspaceId,
        };
    }
}
