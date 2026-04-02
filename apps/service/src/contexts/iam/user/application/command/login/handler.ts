import { CommandHandler } from "shared/domain/command-handler";
import { LoginCommand } from "./command";
import { LoginResultDto } from "./dto";
import { Command } from "shared/domain/command";
import { UnitOfWork } from "shared/infrastructure/unit-of-work";
import { UserRepositoryScope } from "../../user.repository-scope";
import { TokenService } from "iam/user/domain/ports/token.service";

export class LoginHandler implements CommandHandler<LoginCommand, LoginResultDto> {

    constructor(
        private readonly uow: UnitOfWork<UserRepositoryScope>,
        private readonly tokenService: TokenService
    ) { }

    subscribedTo(): Command {
        return LoginCommand;
    }

    async handle(command: LoginCommand): Promise<LoginResultDto> {
        // Login logic comes here
        return this.uow.withTransaction(async (scope) => {

        });

    }

}