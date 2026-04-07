export * from './auth';
export * from './date';

export function emptyToNull<T>(value: T): T | null {
    if (value === '' || value === undefined) return null;
    return value;
}
