import { Command } from 'shared/domain/command';

export class CreateRoleCommand extends Command {
    readonly name: string;
    readonly codeName: string;
    readonly description?: string;
    readonly permissions?: Array<string>;

    constructor(name: string, codeName: string, description?: string, permissions?: Array<string>) {
        super();

        this.name = name;
        this.codeName = codeName;
        this.description = description;
        this.permissions = permissions;
    }
}
