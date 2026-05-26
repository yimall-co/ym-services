import { Command } from 'shared/domain/command';

export class CreateShopCommand extends Command {
    readonly name: string;
    readonly description: string | null;
    readonly banner: string | null;
    readonly phone: string;
    readonly isPrimary: boolean;
    readonly workspaceId: string;

    constructor(
        name: string,
        description: string | null,
        banner: string | null,
        phone: string,
        isPrimary: boolean,
        workspaceId: string,
    ) {
        super();

        this.name = name;
        this.description = description;
        this.banner = banner;
        this.phone = phone;
        this.isPrimary = isPrimary;
        this.workspaceId = workspaceId;
    }
}
