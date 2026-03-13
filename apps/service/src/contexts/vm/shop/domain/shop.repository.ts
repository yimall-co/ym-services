import { ShopId } from 'vm/shared/domain/shop-id';

import { Shop } from './shop';

export interface ShopRepository {
    save(shop: Shop): Promise<void>;
    update(id: ShopId, shop: Shop): Promise<void>;
}
