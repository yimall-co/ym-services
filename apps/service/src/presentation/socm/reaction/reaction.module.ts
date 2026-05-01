import { Module } from '@nestjs/common';

import { ReactionController } from './reaction.controller';
import { ReactionAdapterModule } from './adapters/reaction-adapter.module';

@Module({
    controllers: [ReactionController],
    imports: [ReactionAdapterModule],
    exports: [ReactionAdapterModule],
})
export class ReactionModule { }
