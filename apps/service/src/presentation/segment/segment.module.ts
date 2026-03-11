import { DynamicModule, Module } from '@nestjs/common';

import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { segmentRepositoryProvider, createSegmentCommandHandlerProvider } from './adapters';

@Module({
    imports: [],
    controllers: [SegmentController],
    providers: [SegmentService, segmentRepositoryProvider, createSegmentCommandHandlerProvider],
    exports: [createSegmentCommandHandlerProvider],
})
export class SegmentModule {
    static forRoot(): DynamicModule {
        return {
            module: SegmentModule,
        };
    }
}
