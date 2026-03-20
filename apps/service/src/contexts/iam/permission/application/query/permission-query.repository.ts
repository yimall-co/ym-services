export interface PermissionQueryRepository {
    findById(id: string): Promise<any>;
}
