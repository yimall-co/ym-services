import { Command } from 'shared/domain/command';

export class UpdateRoleCommand extends Command {
    readonly id: string;
    readonly name: string;
    readonly codeName: string;
    readonly description: string;

    constructor(id: string, name: string, codeName: string, description: string) {
        super();

        this.id = id;
        this.name = name;
        this.codeName = codeName;
        this.description = description;
    }
}
