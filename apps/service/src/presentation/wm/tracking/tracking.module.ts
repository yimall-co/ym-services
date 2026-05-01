import { DynamicModule, Module } from '@nestjs/common';

import { TrackingController } from './tracking.controller';
import { createVisitCommandHandlerProvider, visitUnitOfWorkProvider } from './adapters';

@Module({
    controllers: [TrackingController],
    providers: [visitUnitOfWorkProvider, createVisitCommandHandlerProvider],
    exports: [createVisitCommandHandlerProvider],
})
export class TrackingModule {
    static forRoot(): DynamicModule {
        return {
            module: TrackingModule,
        };
    }
}
