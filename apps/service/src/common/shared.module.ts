import { Global, Module } from '@nestjs/common';

import { drizzleInstanceProvider } from './adapters';

@Global()
@Module({
    providers: [drizzleInstanceProvider],
    exports: [drizzleInstanceProvider],
})
export class SharedModule { }
