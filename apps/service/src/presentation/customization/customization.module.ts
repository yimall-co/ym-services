import { DynamicModule, Module } from '@nestjs/common';

import { CustomizationService } from './customization.service';
import { CustomizationController } from './customization.controller';
import {
    customizationQueryRepositoryProvider,
    customizationRepositoryProvider,
    getCustomizationByWorkspaceQueryHandlerProvider,
} from './adapters';

@Module({
    controllers: [CustomizationController],
    providers: [
        CustomizationService,
        customizationRepositoryProvider,
        customizationQueryRepositoryProvider,
        getCustomizationByWorkspaceQueryHandlerProvider,
    ],
    exports: [getCustomizationByWorkspaceQueryHandlerProvider],
})
export class CustomizationModule {
    static forRoot(): DynamicModule {
        return {
            module: CustomizationModule,
        };
    }
}
