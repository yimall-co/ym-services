import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';

import { OfferService } from './offer.service';
import { CreateOfferDto } from './dtos/create-offer.dto';

@Controller({
    path: 'offers',
    version: '1',
})
export class OfferController {
    private readonly logger = new Logger(OfferController.name);

    constructor(private readonly offerService: OfferService) { }

    @Get('shop/:shopId')
    @ApiParam({ name: 'shopId', required: true })
    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'updatedAt', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiOkResponse({ description: 'List of offers' })
    @ApiNotFoundResponse({ description: 'Offers not found' })
    @HttpCode(HttpStatus.OK)
    async getOffersByShop(
        @Param('shopId') shopId: string,
        @Query('id') id: string,
        @Query('limit') limit: number,
        @Query('updatedAt') updatedAt: string,
    ) {
        try {
            return await this.offerService.getOffersByShop({ shopId, limit, updatedAt, id });
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Post()
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createOffer(@Body() createOfferDto: CreateOfferDto) {
        try {
            return await this.offerService.createOffer(createOfferDto);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }
}
