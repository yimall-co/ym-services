import { DynamicModule, Module } from '@nestjs/common';

import { CustomizationService } from './customization.service';
import { CustomizationController } from './customization.controller';
import {
    createCustomizationColorCommandHandlerProvider,
    customizationColorRepositoryProvider,
    customizationQueryRepositoryProvider,
    customizationRepositoryProvider,
    getCustomizationByIdQueryHandlerProvider,
    getCustomizationByWorkspaceQueryHandlerProvider,
} from './adapters';

@Module({
    controllers: [CustomizationController],
    providers: [
        CustomizationService,
        customizationRepositoryProvider,
        customizationQueryRepositoryProvider,
        customizationColorRepositoryProvider,
        getCustomizationByIdQueryHandlerProvider,
        getCustomizationByWorkspaceQueryHandlerProvider,
        createCustomizationColorCommandHandlerProvider,
    ],
    exports: [
        getCustomizationByIdQueryHandlerProvider,
        getCustomizationByWorkspaceQueryHandlerProvider,
        createCustomizationColorCommandHandlerProvider,
    ],
})
export class CustomizationModule {
    static forRoot(): DynamicModule {
        return {
            module: CustomizationModule,
        };
    }
}
