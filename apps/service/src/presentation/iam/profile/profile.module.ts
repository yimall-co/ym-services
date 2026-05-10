import { Module } from '@nestjs/common';

import { ProfileController } from './profile.controller';
import { ProfileAdapterModule } from './adapters/profile-adapter.module';

@Module({
    controllers: [ProfileController],
    providers: [ProfileAdapterModule],
    exports: [ProfileAdapterModule],
})
export class ProfileModule { }
