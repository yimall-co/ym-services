/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { and, desc, eq, gte, isNull, lt, lte, or } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import { categories, shopOffers, shops, subcategories } from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { ShopId } from 'vm/shared/domain/shop-id';

import { offers } from './persistence/drizzle/offers.table';
import { OfferQueryRepository } from '../application/query/offer-query.repository';
import { OfferByShopDto } from '../application/query/get-offers-by-shop/dto';
import { OfferBySlugDto } from '../application/query/get-offer-by-slug/dto';

export class DrizzleOfferQueryRepository
    extends DrizzleRepository<typeof offers>
    implements OfferQueryRepository {
    protected readonly table = offers;

    async findBySlug(slug: string): Promise<OfferBySlugDto | null> {
        throw new Error('Method not implemented.');
    }

    async findAllByShopId(criteria: {
        shopId: ShopId,
        limit?: number,
        cursor?: { updatedAt: Date; id: string };
    }) {
        const { shopId, limit = 10, cursor } = criteria;

        let query = this.client
            .select({
                id: this.table.id,
                updatedAt: this.table.updatedAt,
            })
            .from(this.table)
            .$dynamic();

        query = this.withCategory(query);
        query = this.withSubcategory(query);
        query = this.withShops(query);

        const rows = await query
            .where(
                and(
                    this.withActiveOffers(),
                    eq(shopOffers.shopId, shopId.value),
                    cursor ? or(
                        lt(this.table.updatedAt, cursor.updatedAt),
                        and(
                            eq(this.table.updatedAt, cursor.updatedAt),
                            lt(this.table.id, cursor.id),
                        ),
                    ) : undefined,
                ),
            )
            .orderBy(
                desc(this.table.updatedAt),
                desc(this.table.id),
            )
            .limit(limit + 1);

        return this.withCursorPagination<OfferByShopDto>(rows, limit);
    }

    private withActiveOffers() {
        const now = new Date();

        return and(
            eq(this.table.isActive, true),
            lte(this.table.startDate, now),
            or(
                isNull(this.table.endDate),
                gte(this.table.endDate, now)
            ),
        );
    }

    private withCategory<TQuery extends PgSelect>(query: TQuery) {
        return query.leftJoin(categories, eq(categories.id, this.table.categoryId));
    }

    private withSubcategory<TQuery extends PgSelect>(query: TQuery) {
        return query.leftJoin(subcategories, eq(subcategories.id, this.table.subcategoryId));
    }

    private withShops<TQuery extends PgSelect>(query: TQuery) {
        return query
            .innerJoin(shopOffers, eq(shopOffers.offerId, this.table.id))
            .innerJoin(shops, eq(shops.id, shopOffers.shopId));
    }
}
