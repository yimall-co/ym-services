import { Offer } from 'vm/offer/domain/offer';
import { offerTypes } from 'vm/offer/domain/enum/offer-types';
import { schedulingTypes } from 'vm/offer/domain/enum/scheduling-types';

import { offers } from '../persistence/drizzle/offers.table';

export class OfferMapper {
    static toDomain(primitives: typeof offers.$inferSelect) {
        return Offer.fromPrimitives({
            id: primitives.id,
            type: (primitives.type as any) ?? offerTypes.PRODUCT,
            schedulingType: (primitives.schedulingType as any) ?? schedulingTypes.CAPACITY,
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
            isRemoved: primitives.isRemoved ?? false,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
            categoryId: primitives.categoryId,
            subcategoryId: primitives.subcategoryId ?? '',
            // shopId: primitives.shopId ?? '',
            workspaceId: primitives.workspaceId,
        });
    }

    static toPersistence(offer: Offer): typeof offers.$inferInsert {
        const primitives = offer.toPrimitives();

        return {
            ...primitives,
            type: primitives.type ?? offerTypes.PRODUCT,
            schedulingType: primitives.schedulingType ?? null,
            stock: primitives.stock ?? 0,
            duration: primitives.duration ?? null,
            isActive: primitives.isActive ?? true,
            isRemoved: primitives.isRemoved ?? false,
            subcategoryId: primitives.subcategoryId ?? null,
        };
    }
}
