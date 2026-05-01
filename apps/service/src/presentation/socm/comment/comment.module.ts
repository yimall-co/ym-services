import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentAdapterModule } from './adapters/comment-adapter.module';

@Module({
    controllers: [CommentController],
    imports: [CommentAdapterModule],
    exports: [CommentAdapterModule],
})
export class CommentModule { }
