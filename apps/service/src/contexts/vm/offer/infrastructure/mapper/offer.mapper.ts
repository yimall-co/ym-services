import { Offer } from 'vm/offer/domain/offer';
import { OfferTypes } from 'vm/offer/domain/value-object/offer-type';
import { SchedulingTypes } from 'vm/offer/domain/value-object/offer-scheduling-type';

import { offers } from '../persistence/drizzle/offers.table';

export class OfferMapper {
    static toDomain(primitives: typeof offers.$inferSelect) {
        return Offer.fromPrimitives({
            id: primitives.id,
            type: (primitives.type as any) ?? OfferTypes.PRODUCT,
            schedulingType: (primitives.schedulingType as any) ?? SchedulingTypes.CAPACITY,
            duration: primitives.duration ?? 0,
            title: primitives.title,
            slug: primitives.slug,
            description: primitives.description,
            banner: primitives.banner,
            price: primitives.price,
            stock: primitives.stock ?? 0,
            discount: primitives.discount,
            startDate: primitives.startDate,
            endDate: primitives.endDate,
            isActive: primitives.isActive ?? true,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            categoryId: primitives.categoryId,
            subcategoryId: primitives.subcategoryId ?? '',
            shopId: primitives.shopId ?? '',
            workspaceId: primitives.workspaceId,
        });
    }

    static toPersistence(offer: Offer): typeof offers.$inferInsert {
        const primitives = offer.toPrimitives();

        return {
            ...primitives,
            type: primitives.type ?? OfferTypes.PRODUCT,
            schedulingType: primitives.schedulingType ?? null,
            stock: primitives.stock ?? 0,
            duration: primitives.duration ?? null,
            isActive: primitives.isActive ?? true,
            subcategoryId: primitives.subcategoryId ?? null,
            shopId: primitives.shopId ?? null,
        };
    }
}