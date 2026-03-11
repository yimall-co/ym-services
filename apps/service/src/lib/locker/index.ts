import { Locker } from 'lockersm';

export type LockerConfig = {
    apiBase?: string;
    accessKeyId: string;
    secretAccessKey: string;
    cacheOptions?: {
        fetch: boolean;
        restTime: number;
    };
};

export const createSecret = (config: LockerConfig) => new Locker(config);
