/* eslint-disable prettier/prettier */
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';

import {
    addresses,
    geolocations,
    schedules,
} from 'shared/infrastructure/persistence/drizzle/schema';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { shops } from './persistence/drizzle/shops.table';
import { ShopQueryRepository } from '../application/query/shop-query.repository';
import { ShopByWorkspaceDto } from '../application/query/get-shops-by-workspace/get-shops-by-workspace.dto';
import { ShopBySlugDto } from '../application/query/get-shop-by-slug/get-shop-by-slug.dto';

export class DrizzleShopQueryRepository
    extends DrizzleRepository<typeof shops>
    implements ShopQueryRepository {
    protected readonly table = shops;

    async findAllByWorkspaceId(workspaceId: string): Promise<Array<ShopByWorkspaceDto>> {
        let query = this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                slug: this.table.slug,
                description: this.table.description,
                banner: this.table.banner,
                phone: this.table.phone,
                isPrimary: this.table.isPrimary,
                isVerified: this.table.isVerified,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                address: sql<ShopByWorkspaceDto['address']>`
                    coalesce(
                        jsonb_build_object(
                            'id', ${addresses.id}
                        )
                    )
                `,
                geolocation: sql<ShopByWorkspaceDto['geolocation']>`
                    coalesce(
                        jsonb_build_object(
                            'id', ${geolocations.id}
                        )
                    )
                `,
                schedules: sql<ShopByWorkspaceDto['schedules']>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${schedules.id},
                                'dayOfWeek', ${schedules.dayOfWeek},
                                'isClosed', ${schedules.isClosed}
                            )
                        ) filter (where ${schedules.id} is not null),
                        '[]'::json
                    )
                `,
            })
            .from(this.table)
            .$dynamic();

        query = this.withAddress(query);
        query = this.withGeolocation(query);
        query = this.withSchedules(query);

        const rows = await query
            .where(
                and(
                    eq(this.table.workspaceId, workspaceId),
                    eq(this.table.isVerified, true)
                )
            )
            .groupBy(this.table.id, addresses.id, geolocations.id, schedules.id)
            .orderBy(asc(this.table.name), desc(this.table.createdAt), desc(this.table.updatedAt));

        return rows;
    }

    async findOneBySlug(slug: string, workspaceId: string | null): Promise<ShopBySlugDto | null> {
        let query = this.client
            .select({
                id: this.table.id,
                name: this.table.name,
                slug: this.table.slug,
                description: this.table.description,
                banner: this.table.banner,
                phone: this.table.phone,
                isPrimary: this.table.isPrimary,
                isVerified: this.table.isVerified,
                createdAt: this.table.createdAt,
                updatedAt: this.table.updatedAt,
                address: sql<ShopBySlugDto['address']>`
                    coalesce(
                        jsonb_build_object(
                            'id', ${addresses.id},
                            'street', ${addresses.street},
                            'number', ${addresses.number},
                            'complement', ${addresses.complement},
                            'neighborhood', ${addresses.neighborhood},
                            'city', ${addresses.city},
                            'state', ${addresses.state},
                            'country', ${addresses.country},
                            'postalCode', ${addresses.postalCode},
                            'isOnline', ${addresses.isOnline}
                        )
                    )
                `,
                geolocation: sql<ShopBySlugDto['geolocation']>`
                    coalesce(
                        jsonb_build_object(
                            'id', ${geolocations.id},
                            'latitude', ${geolocations.latitude},
                            'longitude', ${geolocations.longitude},
                            'accuracy', ${geolocations.accuracy}
                        )
                    )
                `,
                schedules: sql<ShopBySlugDto['schedules']>`
                    coalesce(
                        json_agg(
                            distinct jsonb_build_object(
                                'id', ${schedules.id},
                                'dayOfWeek', ${schedules.dayOfWeek},
                                'isClosed', ${schedules.isClosed}
                            )
                        ) filter (where ${schedules.id} is not null),
                        '[]'::json
                    )
                `,
            })
            .from(this.table)
            .$dynamic();

        query = this.withAddress(query);
        query = this.withGeolocation(query);
        query = this.withSchedules(query);

        const [row] = await query
            .where(
                and(
                    eq(this.table.slug, slug),
                    eq(this.table.isVerified, true),
                    workspaceId ? eq(this.table.workspaceId, workspaceId) : undefined,
                ),
            )
            .groupBy(this.table.id, addresses.id, geolocations.id, schedules.id)
            .limit(1);

        return row ?? null;
    }

    private withAddress<T extends PgSelect>(query: T) {
        return query.leftJoin(addresses, eq(addresses.id, this.table.addressId));
    }

    private withGeolocation<T extends PgSelect>(query: T) {
        return query.leftJoin(geolocations, eq(geolocations.id, this.table.geolocationId));
    }

    private withSchedules<T extends PgSelect>(query: T) {
        return query.leftJoin(schedules, eq(schedules.shopId, this.table.id));
    }
}
