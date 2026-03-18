import { Command } from 'shared/domain/command';
import { Response } from 'shared/domain/response';
import { CommandHandler } from 'shared/domain/command-handler';

import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { WorkspaceName } from 'wm/workspace/domain/value-object/workspace-name';
import { WorkspaceDescription } from 'wm/workspace/domain/value-object/workspace-description';
import { WorkspaceRepository } from 'wm/workspace/domain/workspace.repository';

import { UpdateWorkspaceResultDto } from './dto';
import { UpdateWorkspaceCommand } from './command';

export class UpdateWorkspaceCommandHandler implements CommandHandler<
    UpdateWorkspaceCommand,
    UpdateWorkspaceResultDto
> {
    constructor(private readonly workspaceRepository: WorkspaceRepository) { }

    subscribedTo(): Command {
        return UpdateWorkspaceCommand;
    }

    async handle(command: UpdateWorkspaceCommand): Promise<UpdateWorkspaceResultDto> {
        const workspaceId = new WorkspaceId(command.id);
        const currentWorkspace = await this.workspaceRepository.findById(workspaceId);
        if (!currentWorkspace) {
            throw new Error('Cant update unexisting workspace');
        }

        currentWorkspace.changeName(new WorkspaceName(command.name));
        currentWorkspace.changeDescription(new WorkspaceDescription(command.description));

        await this.workspaceRepository.update(workspaceId, currentWorkspace);

        return { workspaceId: workspaceId.value };
    }
}
