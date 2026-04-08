import { UnitOfWork } from "shared/infrastructure/unit-of-work";
import { AddMemberToWorkspaceCommand } from "./command";
import { AddMemberToWorkspaceResultDto } from "./dto";
import { CommandHandler } from "shared/domain/command-handler";
import { Command } from "shared/domain/command";
import { WorkspaceId } from "wm/shared/domain/workspace-id";
import { UserId } from "iam/shared/domain/user-id";
import { UserAlreadyMemberOnWorkspace } from "wm/workspace-member/domain/error/user-already-member-on-workspace";
import { RoleId } from "iam/shared/domain/role-id";
import { UserNotFound } from "iam/user/domain/error/user-not-found";
import { RoleNotFound } from "iam/role/domain/error/role-not-found";
import { WorkspaceMember } from "wm/workspace-member/domain/workspace-member";
import { WorkspaceMemberRepositoryScope } from "../../workspace-member.repository-scope";

export class AddMemberToWorkspaceCommandHandler implements CommandHandler<
    AddMemberToWorkspaceCommand,
    AddMemberToWorkspaceResultDto
> {
    constructor(private readonly uow: UnitOfWork<WorkspaceMemberRepositoryScope>) { }


    subscribedTo(): Command {
        return AddMemberToWorkspaceCommand;
    }

    async handle(command: AddMemberToWorkspaceCommand): Promise<AddMemberToWorkspaceResultDto> {
        const {workspaceId, roleId, userId} = command;

        const workspaceMember = WorkspaceMember.create(
            new WorkspaceId(workspaceId),
            new UserId(userId),
            new RoleId(roleId)
        );

        return this.uow.withTransaction(async (scope) => {
            const workspaceMemberRepository = scope.getWorkspaceMemberRepository();
            const userRepository = scope.getUserRepository();
            const roleRepository = scope.getRoleRepository();

            const roleExists = await roleRepository.existsActiveById(new RoleId(roleId));
            if(!roleExists) throw new RoleNotFound();

            const userExists = await userRepository.existsActiveById(new UserId(userId));
            if(!userExists) throw new UserNotFound();

            const isUserAlreadyMemberOnWorkspace = await workspaceMemberRepository.existsByWorkspaceAndUser(new WorkspaceId(workspaceId), new UserId(userId));
            if(isUserAlreadyMemberOnWorkspace) throw new UserAlreadyMemberOnWorkspace();

            await workspaceMemberRepository.save(workspaceMember);

            return { workspaceMemberId: workspaceMember.getId().value };
        });

    }
}