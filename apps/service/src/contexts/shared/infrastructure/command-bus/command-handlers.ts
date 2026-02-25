import { Command } from 'shared/domain/command';
import { CommandHandler } from 'shared/domain/command-handler';

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
    constructor(private readonly handlers: Array<CommandHandler<Command>>) {
        super();

        this.handlers.forEach((handler) => {
            this.set(handler.subscribedTo(), handler);
        });
    }

    public get(command: Command): CommandHandler<Command> {
        const commandHandler = super.get(command.constructor);
        if (!commandHandler) {
            throw new Error('Command handler not found');
        }

        return commandHandler;
    }
}
