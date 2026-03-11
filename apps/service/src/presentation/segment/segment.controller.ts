import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dtos/create-segment.dto';

@Controller({
    path: 'segments',
    version: '1',
})
export class SegmentController {
    private readonly logger = new Logger('SegmentController');

    constructor(private readonly segmentService: SegmentService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() { }

    @Post()
    @ApiCreatedResponse({ description: 'Segment created' })
    @ApiBadRequestResponse({ description: 'Cannot create segment' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createSegmentDto: CreateSegmentDto) {
        try {
            await this.segmentService.createSegment(createSegmentDto);
            return { message: 'Segment created successfully' };
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException();
        }
    }
}
