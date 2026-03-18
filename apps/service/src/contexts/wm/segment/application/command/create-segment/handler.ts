import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

import { Segment } from 'wm/segment/domain/segment';
import { SegmentRepository } from 'wm/segment/domain/segment.repository';
import { SegmentName } from 'wm/segment/domain/value-object/segment-name';
import { SegmentSlug } from 'wm/segment/domain/value-object/segment-slug';
import { SegmentDescription } from 'wm/segment/domain/value-object/segment-description';
import { SegmentIsActive } from 'wm/segment/domain/value-object/segment-is-active';

import { CreateSegmentDto } from './dto';
import { CreateSegmentCommand } from './command';

export class CreateSegmentCommandHandler implements CommandHandler<
    CreateSegmentCommand,
    CreateSegmentDto
> {
    constructor(private readonly segmentRepository: SegmentRepository) { }

    subscribedTo(): Command {
        return CreateSegmentCommand;
    }

    async handle(command: CreateSegmentCommand): Promise<CreateSegmentDto> {
        const { name, description, isActive } = command;

        const slug = name.trim().split(' ').join('-').toLowerCase().normalize('NFD');

        const segment = Segment.create(
            new SegmentName(name),
            new SegmentSlug(slug),
            new SegmentDescription(description),
            new SegmentIsActive(isActive),
        );

        await this.segmentRepository.save(segment);

        const segmentId = segment.getId();

        return { segmentId: segmentId.value };
    }
}
