export interface Paginated<T> {
    results: Array<T>;
    hasNextPage: boolean;
    lastItem: T | null;
}
