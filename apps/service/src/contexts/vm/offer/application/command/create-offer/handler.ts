import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

import { Offer } from 'vm/offer/domain/offer';
import { OfferRepository } from 'vm/offer/domain/offer.repository';
import { OfferType, OfferTypes } from 'vm/offer/domain/value-object/offer-type';
import { OfferTitle } from 'vm/offer/domain/value-object/offer-title';
import { OfferSlug } from 'vm/offer/domain/value-object/offer-slug';
import { OfferDescription } from 'vm/offer/domain/value-object/offer-description';
import { OfferBanner } from 'vm/offer/domain/value-object/offer-banner';
import { OfferPrice } from 'vm/offer/domain/value-object/offer-price';
import { OfferStock } from 'vm/offer/domain/value-object/offer-stock';
import { OfferDiscount } from 'vm/offer/domain/value-object/offer-discount';
import { OfferStartDate } from 'vm/offer/domain/value-object/offer-start-date';
import { OfferEndDate } from 'vm/offer/domain/value-object/offer-end-date';
import { OfferCategoryId } from 'vm/offer/domain/value-object/offer-category-id';
import { OfferSubCategoryId } from 'vm/offer/domain/value-object/offer-subcategory-id';
import { OfferWorkspaceId } from 'vm/offer/domain/value-object/offer-workspace-id';

import { CreateOfferResultDto } from './dto';
import { CreateOfferCommand } from './command';

export class CreateOfferCommandHandler implements CommandHandler<
    CreateOfferCommand,
    CreateOfferResultDto
> {
    constructor(private readonly offerRepository: OfferRepository) { }

    subscribedTo(): Command {
        return CreateOfferCommand;
    }

    async handle(command: CreateOfferCommand): Promise<CreateOfferResultDto> {
        const startDate = command.startDate ? new Date(command.startDate) : new Date();
        const endDate = command.endDate
            ? new Date(command.endDate)
            : new Date(9999, 11, 31, 0, 0, 0, 0);

        const offer = Offer.create(
            new OfferType(OfferTypes[command.type as keyof typeof OfferTypes]),
            new OfferTitle(command.title),
            new OfferSlug(command.title),
            new OfferDescription(command.description ?? ''),
            new OfferBanner(command.banner),
            new OfferPrice(command.price),
            new OfferStock(command.stock),
            new OfferDiscount(command.discount),
            new OfferStartDate(startDate),
            new OfferEndDate(endDate),
            new OfferCategoryId(command.categoryId),
            new OfferSubCategoryId(command.subcategoryId ?? ''),
            new OfferWorkspaceId(command.workspaceId),
        );

        await this.offerRepository.save(offer);

        const offerId = offer.getId();

        return { offerId: offerId.value };
    }
}
