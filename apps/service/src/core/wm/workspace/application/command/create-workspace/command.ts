import { Command } from 'shared/domain/command';

export class CreateWorkspaceCommand extends Command {
    readonly name: string;
    readonly description: string;
    readonly tin: string | null;
    readonly segmentId: string;
    readonly ownerId: string;

    constructor(
        name: string,
        description: string,
        tin: string | null,
        segmentId: string,
        ownerId: string,
    ) {
        super();

        this.name = name;
        this.description = description;
        this.tin = tin;
        this.segmentId = segmentId;
        this.ownerId = ownerId;
    }
}
