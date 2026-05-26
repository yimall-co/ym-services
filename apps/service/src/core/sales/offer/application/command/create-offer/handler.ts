import { Command } from 'shared/domain/command';
import { Uuid } from 'shared/domain/value-object/uuid';
import { CommandHandler } from 'shared/domain/command-handler';

import { Offer } from 'core/sales/offer/domain/offer';
import { OfferRepository } from 'core/sales/offer/domain/offer.repository';
import { OfferType } from 'core/sales/offer/domain/value-object/offer-type';
import { OfferTitle } from 'core/sales/offer/domain/value-object/offer-title';
import { OfferSlug } from 'core/sales/offer/domain/value-object/offer-slug';
import { OfferDescription } from 'core/sales/offer/domain/value-object/offer-description';
import { OfferBanner } from 'core/sales/offer/domain/value-object/offer-banner';
import { OfferPrice } from 'core/sales/offer/domain/value-object/offer-price';
import { OfferStock } from 'core/sales/offer/domain/value-object/offer-stock';
import { OfferDiscount } from 'core/sales/offer/domain/value-object/offer-discount';
import { OfferStartDate } from 'core/sales/offer/domain/value-object/offer-start-date';
import { OfferEndDate } from 'core/sales/offer/domain/value-object/offer-end-date';

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
        const startDate = command.startDate
            ? OfferStartDate.create(new Date(command.startDate))
            : OfferStartDate.create(new Date());
        const endDate = command.endDate
            ? OfferEndDate.create(new Date(command.endDate))
            : OfferEndDate.createMaxDate();

        const offer = Offer.create(
            new OfferType(command.type),
            new OfferTitle(command.title),
            new OfferSlug(command.title),
            new OfferDescription(command.description ?? ''),
            new OfferBanner(command.banner),
            new OfferPrice(command.price),
            new OfferStock(command.stock),
            new OfferDiscount(command.discount),
            startDate,
            endDate,
            new Uuid(command.categoryId),
            new Uuid(command.subcategoryId ?? ''),
            new Uuid(command.workspaceId),
        );

        await this.offerRepository.save(offer);

        const offerId = offer.getId();

        return { offerId: offerId.value };
    }
}
