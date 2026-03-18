import { DynamicModule, Module } from '@nestjs/common';

@Module({
    controllers: [],
    providers: [],
    exports: [],
})
export class YimoModule {
    static forRoot(): DynamicModule {
        return {
            module: YimoModule,
        };
    }
}
