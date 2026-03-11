import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';
import { Response } from 'shared/domain/response';

export class CommandHandlers extends Map<Command, CommandHandler<Command, Response>> {
    constructor(private readonly handlers: Array<CommandHandler<Command, Response>>) {
        super();

        this.handlers.forEach((handler) => {
            this.set(handler.subscribedTo(), handler);
        });
    }

    public get(command: Command): CommandHandler<Command, Response> {
        const commandHandler = super.get(command.constructor);
        if (!commandHandler) {
            throw new Error('Command handler not found');
        }

        return commandHandler;
    }
}
