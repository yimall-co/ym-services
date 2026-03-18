import { DynamicModule, Module } from '@nestjs/common';

import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import {
    segmentRepositoryProvider,
    createSegmentCommandHandlerProvider,
    segmentQueryRepositoryProvider,
    getSegmentsByCriteriaQueryHandlerProvider,
} from './adapters';

@Module({
    imports: [],
    controllers: [SegmentController],
    providers: [
        SegmentService,
        segmentRepositoryProvider,
        segmentQueryRepositoryProvider,
        createSegmentCommandHandlerProvider,
        getSegmentsByCriteriaQueryHandlerProvider,
    ],
    exports: [createSegmentCommandHandlerProvider, getSegmentsByCriteriaQueryHandlerProvider],
})
export class SegmentModule {
    static forRoot(): DynamicModule {
        return {
            module: SegmentModule,
        };
    }
}
