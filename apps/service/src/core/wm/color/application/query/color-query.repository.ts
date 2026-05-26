export interface ColorQueryRepository {
    findOneByCustomization(customizationId: string): Promise<any>;
}
