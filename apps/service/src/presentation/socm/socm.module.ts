import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CommentModule } from './comment/comment.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
    imports: [CommentModule, ReactionModule],
    exports: [CommentModule, ReactionModule],
})
export class SocialManagementModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        return consumer.apply().forRoutes('*');
    }
}
