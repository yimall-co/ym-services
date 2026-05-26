import { ShopRepository } from '../domain/shop.repository';
import { ShopQueryRepository } from './query/shop-query.repository';

export interface ShopRepositoryScope {
    getShopRepository(): ShopRepository;
    getShopQueryRepository(): ShopQueryRepository;
}
