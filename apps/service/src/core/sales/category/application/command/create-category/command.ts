import { Command } from 'shared/domain/command';

export class CreateCategoryCommand extends Command {
    readonly label: string;
    readonly description: string | null;
    readonly banner: string | null;
    readonly position: number | null;
    readonly workspaceId: string;

    constructor(
        label: string,
        description: string | null,
        banner: string | null,
        position: number | null,
        workspaceId: string,
    ) {
        super();

        this.label = label;
        this.description = description;
        this.banner = banner;
        this.position = position;
        this.workspaceId = workspaceId;
    }
}
