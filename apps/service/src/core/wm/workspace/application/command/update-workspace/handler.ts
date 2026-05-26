import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { WorkspaceName } from 'wm/workspace/domain/value-object/workspace-name';
import { WorkspaceDescription } from 'wm/workspace/domain/value-object/workspace-description';

import { UpdateWorkspaceResultDto } from './dto';
import { UpdateWorkspaceCommand } from './command';
import { WorkspaceRepositoryScope } from '../../workspace.repository-scope';

export class UpdateWorkspaceCommandHandler implements CommandHandler<
    UpdateWorkspaceCommand,
    UpdateWorkspaceResultDto
> {
    constructor(private readonly uow: UnitOfWork<WorkspaceRepositoryScope>) { }

    subscribedTo(): Command {
        return UpdateWorkspaceCommand;
    }

    async handle(command: UpdateWorkspaceCommand): Promise<UpdateWorkspaceResultDto> {
        const workspaceId = new WorkspaceId(command.id);

        return this.uow.withTransaction(async (scope) => {
            const workspaceRepository = scope.getWorkspaceRepository();

            const workspace = await workspaceRepository.findById(workspaceId);
            if (!workspace) {
                throw new Error('Cant update unexisting workspace');
            }

            // TODO: owner cannot have more than 3 workspaces.

            workspace.changeName(new WorkspaceName(command.name));
            workspace.changeDescription(new WorkspaceDescription(command.description));

            await workspaceRepository.update(workspaceId, workspace);

            return { workspaceId: workspaceId.value };
        });
    }
}
