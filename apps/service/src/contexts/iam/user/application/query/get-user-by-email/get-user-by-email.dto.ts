export interface UserByEmailDto {
    id: string;
    email: string;
    accounts: Array<{
        id: string;
        accountId: string;
        providerId: string;
        scope: string;
        password: string;
    }>;
    workspaces: Array<{ workspaceId: string }>;
}
