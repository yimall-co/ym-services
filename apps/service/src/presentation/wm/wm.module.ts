import { Module } from '@nestjs/common';

import { CustomizationModule } from './customization/customization.module';
import { SegmentModule } from './segment/segment.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
    imports: [CustomizationModule, SegmentModule, WorkspaceModule, TrackingModule],
    exports: [CustomizationModule, SegmentModule, WorkspaceModule, TrackingModule],
})
export class WorkspaceManagementModule { }
