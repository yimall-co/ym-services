export interface ProfileQueryRepository {
    findByUserId(userId: string): Promise<any>;
}
