import { Command } from "shared/domain/command";

export class LoginCommand extends Command {
    readonly emailOrUsername: string;
    readonly password: string;

    constructor(emailOrUsername: string, password: string) {
        super();
        this.emailOrUsername = emailOrUsername;
        this.password = password;
    }   
}