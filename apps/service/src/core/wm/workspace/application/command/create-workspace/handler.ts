import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { SegmentId } from 'wm/shared/domain/segment-id';
import { Workspace } from 'wm/workspace/domain/workspace';
import { WorkspaceName } from 'wm/workspace/domain/value-object/workspace-name';
import { WorkspaceSlug } from 'wm/workspace/domain/value-object/workspace-slug';
import { WorkspaceDescription } from 'wm/workspace/domain/value-object/workspace-description';
import { WorkspaceTin } from 'wm/workspace/domain/value-object/workspace-tin';
import { WorkspaceOwnerId } from 'wm/workspace/domain/value-object/workspace-owner-id';

import { CreateWorkspaceResultDto } from './dto';
import { CreateWorkspaceCommand } from './command';
import { WorkspaceRepositoryScope } from '../../workspace.repository-scope';

export class CreateWorkspaceCommandHandler implements CommandHandler<
    CreateWorkspaceCommand,
    CreateWorkspaceResultDto
> {
    constructor(private readonly uow: UnitOfWork<WorkspaceRepositoryScope>) { }

    subscribedTo(): Command {
        return CreateWorkspaceCommand;
    }

    async handle(command: CreateWorkspaceCommand): Promise<CreateWorkspaceResultDto> {
        const workspace = Workspace.create(
            new WorkspaceName(command.name),
            WorkspaceSlug.fromRaw(command.name),
            new WorkspaceDescription(command.description),
            new WorkspaceTin(command.tin ?? ''),
            new SegmentId(command.segmentId),
            new WorkspaceOwnerId(command.ownerId),
        );

        return this.uow.withTransaction(async (scope) => {
            const workspaceRepository = scope.getWorkspaceRepository();

            const existsBySlug = await workspaceRepository.existsActiveBySlug(workspace.getSlug());
            if (existsBySlug) {
                throw new Error('Workspace already exists');
            }

            // TODO: owner cannot have more than 3 workspaces.

            await workspaceRepository.save(workspace);

            const workspaceId = workspace.getId();

            return { workspaceId: workspaceId.value };
        });
    }
}
