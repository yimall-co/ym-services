import { DynamicModule, Global, Module } from '@nestjs/common';

import { queryHandlersProvider, queryBusProvider, drizzleInstanceProvider } from './adapters';

@Global()
@Module({
    providers: [drizzleInstanceProvider],
    exports: [drizzleInstanceProvider],
})
export class SharedModule {
    static forRoot(): DynamicModule {
        return {
            global: true,
            module: SharedModule,
        };
    }
}
