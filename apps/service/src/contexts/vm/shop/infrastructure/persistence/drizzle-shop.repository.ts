import { eq } from 'drizzle-orm';

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

    async save(shop: Shop): Promise<void> {
        await this.client.insert(this.table).values(ShopMapper.toPersistence(shop));
    }

    async update(id: ShopId, shop: Shop): Promise<void> {
        await this.client
            .update(this.table)
            .set(ShopMapper.toPersistence(shop))
            .where(eq(this.table.id, id.value));
    }
}
