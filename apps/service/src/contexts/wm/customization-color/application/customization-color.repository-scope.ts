import { CustomizationColorRepository } from '../domain/customization-color.repository';
import { CustomizationColorQueryRepository } from './query/customization-color-query.repository';

export interface CustomizationColorRepositoryScope {
    getCustomizationColorRepository(): CustomizationColorRepository;
    getCustomizationColorQueryRepository(): CustomizationColorQueryRepository;
}
