import { Command } from 'shared/domain/command';

import { OfferTypes } from 'vm/offer/domain/enum/offer-types';

export class CreateOfferCommand extends Command {
    readonly type: OfferTypes;
    readonly title: string;
    readonly description: string | null;
    readonly banner: string;
    readonly price: number;
    readonly stock: number;
    readonly discount: number;
    readonly startDate: string | null;
    readonly endDate: string | null;
    readonly categoryId: string;
    readonly subcategoryId: string | null;
    readonly workspaceId: string;

    constructor(
        type: OfferTypes,
        title: string,
        description: string | null,
        banner: string,
        price: number,
        stock: number,
        discount: number,
        startDate: string | null,
        endDate: string | null,
        categoryId: string,
        subcategoryId: string | null,
        workspaceId: string,
    ) {
        super();

        this.type = type;
        this.title = title;
        this.description = description;
        this.banner = banner;
        this.price = price;
        this.stock = stock;
        this.discount = discount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.workspaceId = workspaceId;
    }
}
