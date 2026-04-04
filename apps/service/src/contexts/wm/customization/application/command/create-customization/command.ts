import { Command } from 'shared/domain/command';

import { FontValue } from 'wm/customization/domain/value-object/customization-font';

export class CreateCustomizationCommand extends Command {
    readonly logo: string;
    readonly fontPrimary: FontValue;
    readonly fontSecondary: FontValue;
    readonly workspaceId: string;

    constructor(
        logo: string,
        fontPrimary: FontValue,
        fontSecondary: FontValue,
        workspaceId: string,
    ) {
        super();

        this.logo = logo;
        this.fontPrimary = fontPrimary;
        this.fontSecondary = fontSecondary;
        this.workspaceId = workspaceId;
    }
}
