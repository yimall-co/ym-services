export interface CustomizationColorQueryRepository {
    findOneByCustomization(customizationId: string): Promise<any>;
}
