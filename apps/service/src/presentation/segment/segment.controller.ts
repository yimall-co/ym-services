/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';

import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dtos/create-segment.dto';

@Controller({
    path: 'segments',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class SegmentController {
    private readonly logger = new Logger(SegmentController.name);

    constructor(private readonly segmentService: SegmentService) { }

    @Get()
    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'updatedAt', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiOkResponse({ description: 'Segments retrieved successfully' })
    @ApiNotFoundResponse({ description: 'No segments found' })
    @HttpCode(HttpStatus.OK)
    async getSegments(
        @Query('id') id: string,
        @Query('limit') limit: number,
        @Query('updatedAt') updatedAt: string
    ) {
        try {
            return await this.segmentService.getAllSegments({ id, limit, updatedAt });
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: 'Segment created' })
    @ApiBadRequestResponse({ description: 'Cannot create segment' })
    @HttpCode(HttpStatus.CREATED)
    async createSegment(@Body() createSegmentDto: CreateSegmentDto) {
        try {
            await this.segmentService.createSegment(createSegmentDto);
            return { message: 'Segment created successfully' };
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }
}
