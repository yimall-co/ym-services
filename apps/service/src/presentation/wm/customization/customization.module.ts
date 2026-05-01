import { DynamicModule, Module } from '@nestjs/common';

import { CustomizationController } from './customization.controller';
import {
    createCustomizationColorCommandHandlerProvider,
    createCustomizationCommandHandlerProvider,
    customizationColorRepositoryProvider,
    customizationColorUnitOfWorkProvider,
    customizationQueryRepositoryProvider,
    customizationUnitOfWorkProvider,
    getCustomizationByIdQueryHandlerProvider,
    getCustomizationByWorkspaceQueryHandlerProvider,
} from './adapters';

@Module({
    controllers: [CustomizationController],
    providers: [
        customizationUnitOfWorkProvider,
        customizationColorUnitOfWorkProvider,
        customizationQueryRepositoryProvider,
        customizationColorRepositoryProvider,
        getCustomizationByIdQueryHandlerProvider,
        getCustomizationByWorkspaceQueryHandlerProvider,
        createCustomizationCommandHandlerProvider,
        createCustomizationColorCommandHandlerProvider,
    ],
    exports: [
        getCustomizationByIdQueryHandlerProvider,
        getCustomizationByWorkspaceQueryHandlerProvider,
        createCustomizationCommandHandlerProvider,
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
