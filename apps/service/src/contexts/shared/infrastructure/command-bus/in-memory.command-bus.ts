import { Command } from 'shared/domain/command';
import { CommandBus } from 'shared/domain/command-bus';

import { CommandHandlers } from './command-handlers';

export class InMemoryCommandBus implements CommandBus {
    constructor(private readonly commandHandlers: CommandHandlers) {}

    async dispatch(command: Command): Promise<void> {
        const commandHandler = this.commandHandlers.get(command);
        if (!commandHandler) {
            throw new Error('Command handler not found');
        }

        return commandHandler.handle(command);
    }
}
