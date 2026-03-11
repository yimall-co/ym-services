import { Command } from './command';
import { Response } from './response';

export interface CommandHandler<TCommand extends Command, TResponse extends Response> {
    subscribedTo(): Command;
    handle(command: TCommand): Promise<TResponse>;
}
