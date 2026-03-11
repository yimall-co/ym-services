import { Controller, Logger } from '@nestjs/common';

import { OfferService } from './offer.service';

@Controller({
    path: 'offers',
    version: '1',
})
export class OfferController {
    private readonly logger: Logger = new Logger('OfferController');

    constructor(private readonly offerService: OfferService) { }
}
