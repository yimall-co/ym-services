import { Command } from 'shared/domain/command';

export class CreateSegmentCommand extends Command {
    readonly name: string;
    readonly description: string;
    readonly isActive: boolean;

    constructor(name: string, description: string, isActive: boolean) {
        super();

        this.name = name;
        this.description = description;
        this.isActive = isActive;
    }
}
