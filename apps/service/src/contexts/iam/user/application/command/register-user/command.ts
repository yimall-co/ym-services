import { Command } from 'shared/domain/command';

export class RegisterUserCommand extends Command {
    readonly name: string;
    readonly image?: string;
    readonly email: string;
    readonly password: string;
    readonly roles?: Array<string>;

    constructor(
        name: string,
        email: string,
        password: string,
        image?: string,
        roles?: Array<string>,
    ) {
        super();

        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;
        this.roles = roles;
    }
}
