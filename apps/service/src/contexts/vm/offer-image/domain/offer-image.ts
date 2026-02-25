import { AggregateRoot } from 'shared/domain/aggregate-root';

import { OfferId } from 'vm/shared/domain/offer-id';
import { OfferImageId } from 'vm/shared/domain/offer-image-id';

import { OfferImageImage } from './value-object/offer-image-image';
import { OfferImageDescription } from './value-object/offer-image-description';
import { OfferImageCreatedAt } from './value-object/offer-image-created-at';
import { OfferImageUpdatedAt } from './value-object/offer-image-updated-at';

export interface OfferImagePrimitives {
    id: string;
    image: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    offerId: string;
}

export class OfferImage extends AggregateRoot {
    readonly id: OfferImageId;
    readonly image: OfferImageImage;
    readonly description: OfferImageDescription;
    readonly createdAt: OfferImageCreatedAt;
    readonly updatedAt: OfferImageUpdatedAt;
    readonly offerId: OfferId;

    constructor(
        id: OfferImageId,
        image: OfferImageImage,
        description: OfferImageDescription,
        createdAt: OfferImageCreatedAt,
        updatedAt: OfferImageUpdatedAt,
        offerId: OfferId,
    ) {
        super();

        this.id = id;
        this.image = image;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.offerId = offerId;
    }

    static fromPrimitives(primitives: OfferImagePrimitives): OfferImage {
        return new OfferImage(
            new OfferImageId(primitives.id),
            new OfferImageImage(primitives.image),
            new OfferImageDescription(primitives.description),
            new OfferImageCreatedAt(primitives.createdAt),
            new OfferImageUpdatedAt(primitives.updatedAt),
            new OfferId(primitives.offerId),
        );
    }

    toPrimitives(): OfferImagePrimitives {
        return {
            id: this.id.value,
            image: this.image.value,
            description: this.description.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            offerId: this.offerId.value,
        };
    }
}
