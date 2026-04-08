import { Command } from "shared/domain/command";

export class AddMemberToWorkspaceCommand extends Command {
    readonly workspaceId: string;
    readonly userId: string;
    readonly roleId: string;

    constructor(workspaceId: string, userId: string, roleId: string) {
        super();    
        
        this.workspaceId = workspaceId;
        this.userId = userId;
        this.roleId = roleId;
    }
}