import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { SegmentId } from 'wm/shared/domain/segment-id';
import { Workspace } from 'wm/workspace/domain/workspace';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';
import { WorkspaceName } from 'wm/workspace/domain/value-object/workspace-name';
import { WorkspaceSlug } from 'wm/workspace/domain/value-object/workspace-slug';
import { WorkspaceDescription } from 'wm/workspace/domain/value-object/workspace-description';
import { WorkspaceTin } from 'wm/workspace/domain/value-object/workspace-tin';
import { WorkspaceOwnerId } from 'wm/workspace/domain/value-object/workspace-owner-id';

import { CreateWorkspaceCommand } from './create-workspace.command';

export class CreateWorkspaceCommandHandler implements CommandHandler<CreateWorkspaceCommand> {
    constructor(private readonly workspaceRepository: WorkspaceRepository) { }

    subscribedTo(): Command {
        return CreateWorkspaceCommand;
    }

    async handle(command: CreateWorkspaceCommand): Promise<void> {
        const slugify = (value: string) => {
            return value.split(' ').join('-').trim().toLocaleLowerCase();
        };

        const slug = slugify(command.name);

        const workspace = Workspace.create(
            new WorkspaceName(command.name),
            new WorkspaceSlug(slug),
            new WorkspaceDescription(command.description),
            new WorkspaceTin(command.tin ?? ''),
            new SegmentId(command.segmentId),
            new WorkspaceOwnerId(command.ownerId),
        );

        await this.workspaceRepository.save(workspace);
    }
}
