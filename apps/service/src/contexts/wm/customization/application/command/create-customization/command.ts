import { Command } from 'shared/domain/command';

import { Font } from 'wm/customization/domain/enum/fonts';

export class CreateCustomizationCommand extends Command {
    readonly logo: string;
    readonly fontPrimary: Font;
    readonly fontSecondary: Font;
    readonly workspaceId: string;

    constructor(logo: string, fontPrimary: Font, fontSecondary: Font, workspaceId: string) {
        super();

        this.logo = logo;
        this.fontPrimary = fontPrimary;
        this.fontSecondary = fontSecondary;
        this.workspaceId = workspaceId;
    }
}
