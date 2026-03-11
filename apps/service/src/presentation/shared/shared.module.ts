import { DynamicModule, Module } from '@nestjs/common';

import { drizzleInstanceProvider } from './adapters';

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
