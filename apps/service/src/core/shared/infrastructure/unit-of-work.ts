export interface UnitOfWork<TRepositoryScope> {
    withTransaction<T>(fn: (scope: TRepositoryScope) => Promise<T>): Promise<T>;
}
