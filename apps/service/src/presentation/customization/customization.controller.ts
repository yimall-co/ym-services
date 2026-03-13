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
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';

import { CustomizationService } from './customization.service';
import { CreateColorDto } from './dtos/create-color.dto';
import { CreateCustomizationDto } from './dtos/create-customization.dto';

@Controller({
    path: 'customizations',
    version: '1',
})
export class CustomizationController {
    private readonly logger: Logger = new Logger('CustomizationController');

    constructor(private readonly customizationService: CustomizationService) { }

    @Get()
    getAll() {
        try {
            return [];
        } catch (error) {
            this.logger.error(error);
            throw new NotFoundException();
        }
    }

    @Get(':id')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: string) {
        try {
            return await this.customizationService.getCustomizationById(id);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Get('workspace/:workspaceId')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getCustomizationByWorkspace(@Param('workspaceId') workspaceId: string) {
        try {
            return await this.customizationService.getCustomizationByWorkspace(workspaceId);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Post()
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() customization: CreateCustomizationDto) {
        try {
            return await this.customizationService.create(customization);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }

    @Post(':id/colors')
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createColor(@Param('id') customizationId: string, @Body() color: CreateColorDto) {
        try {
            return await this.customizationService.createColor(customizationId, color);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }
}
