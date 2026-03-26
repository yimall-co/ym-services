import { DynamicModule, Module } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { createProfileCommandHandlerProvider, profileUnitOfWorkProvider } from './adapters';

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, profileUnitOfWorkProvider, createProfileCommandHandlerProvider],
    exports: [createProfileCommandHandlerProvider],
})
export class ProfileModule {
    static forRoot(): DynamicModule {
        return {
            module: ProfileModule,
        };
    }
}
