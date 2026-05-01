import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CreateProfileCommand } from 'iam/profiles/application/command/create-profile/command';
import { CreateProfileResultDto } from 'iam/profiles/application/command/create-profile/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateProfileDto } from './dtos/create-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async createProfile(dto: CreateProfileDto) {
        const command = new CreateProfileCommand(
            dto.userId,
            new Date(dto.birthdate),
            dto.gender,
            dto.customGender,
            dto.pronouns,
            dto.customPronouns,
            dto.newsLetter,
        );

        return await this.commandBus.dispatch<CreateProfileResultDto>(command);
    }
}
