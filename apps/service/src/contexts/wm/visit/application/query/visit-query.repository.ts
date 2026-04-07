export interface VisitQueryRepository {
    findOneByWorkspace(workspaceId: string): Promise<any>;
}
