import { Command } from 'shared/domain/command';

export class CreateUserCommand extends Command {
    readonly name: string;
    readonly image: string;
    readonly email: string;

    constructor(name: string, image: string, email: string) {
        super();

        this.name = name;
        this.image = image;
        this.email = email;
    }
}
