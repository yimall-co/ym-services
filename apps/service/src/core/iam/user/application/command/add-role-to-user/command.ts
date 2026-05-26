import { Command } from 'shared/domain/command';

export class AddRoleToUserCommand extends Command {
    readonly userId: string;
    readonly roleId: string;

    constructor(userId: string, roleId: string) {
        super();

        this.userId = userId;
        this.roleId = roleId;
    }
}
