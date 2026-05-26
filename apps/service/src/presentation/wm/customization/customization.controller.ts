import { CacheInterceptor } from '@nestjs/cache-manager';
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
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CustomizationByIdDto } from 'wm/customization/application/query/get-customization-by-id/dto';
import { GetCustomizationByIdQuery } from 'wm/customization/application/query/get-customization-by-id/query';
import { CustomizationByWorkspaceDto } from 'wm/customization/application/query/get-customization-by-workspace/dto';
import { GetCustomizationByWorkspaceQuery } from 'wm/customization/application/query/get-customization-by-workspace/query';
import { CreateCustomizationResultDto } from 'wm/customization/application/command/create-customization/dto';
import { CreateCustomizationCommand } from 'wm/customization/application/command/create-customization/command';
import { CreateColorResultDto } from 'wm/color/application/command/create-color/dto';
import { CreateColorCommand } from 'wm/color/application/command/create-color/command';

import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { COMMAND_BUS, QUERY_BUS } from 'src/common/adapters/constants';

import { CreateColorDto } from './dtos/create-color.dto';
import { CreateCustomizationDto } from './dtos/create-customization.dto';

@ApiTags('Customizations')
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
            const command = new CreateColorCommand(label, value, isDefault, customizationId);
            return await this.commandBus.dispatch<CreateColorResultDto>(command);
        } catch (error: any) {
            this.logger.error(error.message);
            throw new BadRequestException();
        }
    }
}
