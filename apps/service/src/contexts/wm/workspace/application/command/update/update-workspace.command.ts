import { Command } from 'shared/domain/command';

export class UpdateWorkspaceCommand extends Command {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    constructor(id: string, name: string, description: string) {
        super();

        this.id = id;
        this.name = name;
        this.description = description;
    }
}
