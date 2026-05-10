/* eslint-disable prettier/prettier */
import { and, desc, eq, gte, isNull, lt, lte, or } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import {
    categories,
    shopOffers,
    shops,
    subcategories
} from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { OfferBySlugDto } from 'vm/offer/application/query/get-offer-by-slug/dto';
import { OfferByShopDto } from 'vm/offer/application/query/get-offers-by-shop/dto';
import { OfferByWorkspaceDto } from 'vm/offer/application/query/get-offers-by-workspace/dto';
import { OfferQueryRepository, PaginatedOffer } from 'vm/offer/application/query/offer-query.repository';

import { offers } from './drizzle/offers.table';

export class DrizzleOfferQueryRepository
    extends DrizzleRepository<typeof offers>
    implements OfferQueryRepository {
    protected readonly table = offers;

    async findBySlug(slug: string): Promise<OfferBySlugDto | null> {
        throw new Error('Method not implemented.');
    }

    async findAllByShopId(criteria: {
        shopId: string,
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
                    eq(shopOffers.shopId, shopId),
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

    async findAllByWorkspaceId(criteria: { workspaceId: string; limit?: number; cursor?: { id: string; updatedAt: Date; }; }): Promise<PaginatedOffer<OfferByWorkspaceDto>> {
        const { workspaceId, limit = 10, cursor } = criteria;

        let query = this.client
            .select({
                id: this.table.id,
                type: this.table.type,
                title: this.table.title,
                slug: this.table.slug,
                description: this.table.description,
                banner: this.table.banner,
                price: this.table.price,
                stock: this.table.stock,
                discount: this.table.discount,
                startDate: this.table.startDate,
                endDate: this.table.endDate,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
            })
            .from(this.table)
            .$dynamic();

        query = this.withCategory(query);
        query = this.withSubcategory(query);

        const rows = await query
            .where(
                and(
                    this.withActiveOffers(),
                    eq(this.table.workspaceId, workspaceId),
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

        return this.withCursorPagination<OfferByWorkspaceDto>(rows, limit);
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
        return query.innerJoin(categories, eq(categories.id, this.table.categoryId));
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
