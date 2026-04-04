import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    NotFoundException,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CustomizationByIdDto } from 'wm/customization/application/query/get-customization-by-id/dto';
import { GetCustomizationByIdQuery } from 'wm/customization/application/query/get-customization-by-id/query';
import { CustomizationByWorkspaceDto } from 'wm/customization/application/query/get-customization-by-workspace/dto';
import { GetCustomizationByWorkspaceQuery } from 'wm/customization/application/query/get-customization-by-workspace/query';
import { CreateCustomizationResultDto } from 'wm/customization/application/command/create-customization/dto';
import { CreateCustomizationCommand } from 'wm/customization/application/command/create-customization/command';
import { CreateCustomizationColorResultDto } from 'wm/customization-color/application/command/create-customization-color/dto';
import { CreateCustomizationColorCommand } from 'wm/customization-color/application/command/create-customization-color/command';

import { JwtAuthGuard } from 'presentation/shared/guards/jwt-auth.guard';
import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateColorDto } from './dtos/create-color.dto';
import { CreateCustomizationDto } from './dtos/create-customization.dto';

@Controller({
    path: 'customizations',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class CustomizationController {
    private readonly logger = new Logger(CustomizationController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

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
            const query = new GetCustomizationByIdQuery(id);
            return await this.queryBus.ask<CustomizationByIdDto>(query);
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
            const query = new GetCustomizationByWorkspaceQuery(workspaceId);
            return await this.queryBus.ask<CustomizationByWorkspaceDto>(query);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new NotFoundException();
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createCustomization(@Body() customization: CreateCustomizationDto) {
        try {
            const command = new CreateCustomizationCommand(
                customization.logo,
                customization.fontPrimary,
                customization.fontSecondary,
                customization.workspaceId,
            );
            return await this.commandBus.dispatch<CreateCustomizationResultDto>(command);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }

    @Post(':id/colors')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createColor(
        @Param('id') customizationId: string,
        @Body() createColorDto: CreateColorDto,
    ) {
        try {
            const { label, value, isDefault } = createColorDto;
            const command = new CreateCustomizationColorCommand(
                label,
                value,
                isDefault,
                customizationId,
            );
            return await this.commandBus.dispatch<CreateCustomizationColorResultDto>(command);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }
}
