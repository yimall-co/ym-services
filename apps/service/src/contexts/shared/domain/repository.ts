import { Response } from './response';

export abstract class Repository {
    abstract findAll(): Promise<Response>;
    abstract findById<TVO>(id: TVO): Promise<Response>;
}
