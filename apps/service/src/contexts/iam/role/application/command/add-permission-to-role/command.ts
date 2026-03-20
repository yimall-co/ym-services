import { Command } from 'shared/domain/command';

export class AddPermissionToRoleCommand extends Command {
    readonly roleId: string;
    readonly permissionId: string;

    constructor(roleId: string, permissionId: string) {
        super();

        this.roleId = roleId;
        this.permissionId = permissionId;
    }
}
