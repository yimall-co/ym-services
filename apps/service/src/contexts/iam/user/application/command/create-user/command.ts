import { Command } from 'shared/domain/command';

export class CreateUserCommand extends Command {
    readonly name: string;
    readonly image: string;
    readonly email: string;
    readonly roles?: Array<string>;

    constructor(name: string, image: string, email: string, roles?: Array<string>) {
        super();

        this.name = name;
        this.image = image;
        this.email = email;
        this.roles = roles;
    }
}
