import { Command } from 'shared/domain/command';

export class CreatePermissionCommand extends Command {
    readonly name: string;
    readonly codeName: string;
    readonly description?: string;
    readonly isActive?: boolean;

    constructor(name: string, codeName: string, description?: string, isActive?: boolean) {
        super();

        this.name = name;
        this.codeName = codeName;
        this.description = description;
        this.isActive = isActive;
    }
}
