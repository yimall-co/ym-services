/* eslint-disable prettier/prettier */
import { and, eq, SQL } from 'drizzle-orm';

import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { Shop } from 'vm/shop/domain/shop';
import { ShopId } from 'vm/shared/domain/shop-id';
import { ShopRepository } from 'vm/shop/domain/shop.repository';

import { shops } from './drizzle/shops.table';
import { ShopMapper } from '../mapper/shop.mapper';

export class DrizzleShopRepository
    extends DrizzleRepository<typeof shops>
    implements ShopRepository {
    protected readonly table = shops;

    async existsBySlug(slug: string): Promise<boolean> {
        const rows = await this.client
            .select({ shopId: this.table.id })
            .from(this.table)
            .where(
                this.withValidShops(
                    eq(this.table.slug, slug)
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async alreadyHasPrimaryShop(): Promise<boolean> {
        const rows = await this.client
            .select({ shopId: this.table.id })
            .from(this.table)
            .where(
                this.withValidShops(
                    eq(this.table.isPrimary, true),
                ),
            )
            .limit(1);

        return rows.length > 0;
    }

    async save(shop: Shop): Promise<void> {
        await this.client.transaction(async (transaction) => {
            const tx = this.client ?? transaction;

            const { id, ...rest } = ShopMapper.toPersistence(shop);

            await tx
                .insert(this.table)
                .values(ShopMapper.toPersistence(shop))
                .onConflictDoUpdate({
                    target: this.table.id,
                    set: {
                        ...rest,
                    },
                });
        });
    }

    async update(id: ShopId, shop: Shop): Promise<void> {
        await this.client
            .update(this.table)
            .set(ShopMapper.toPersistence(shop))
            .where(eq(this.table.id, id.value));
    }

    private withValidShops(condition?: SQL) {
        return and(
            condition ? condition : undefined,
            eq(this.table.isVerified, true),
        );
    }
}
