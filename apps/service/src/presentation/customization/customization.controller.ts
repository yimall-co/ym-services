import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Param,
} from '@nestjs/common';

import { CustomizationService } from './customization.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

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

    @Get('workspace/:workspaceId')
    @ApiOkResponse({ description: '' })
    @ApiNotFoundResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    async getCustomizationByWorkspace(@Param('workspaceId') workspaceId: string) {
        try {
            return await this.customizationService.getCustomizationByWorkspace(workspaceId);
        } catch (error) {
            this.logger.error(error);
            throw new NotFoundException(error.message);
        }
    }
}
