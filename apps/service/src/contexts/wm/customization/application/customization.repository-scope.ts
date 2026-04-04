import { CustomizationColorRepository } from 'wm/customization-color/domain/customization-color.repository';
import { CustomizationColorQueryRepository } from 'wm/customization-color/application/query/customization-color-query.repository';

import { CustomizationRepository } from '../domain/customization.repository';
import { CustomizationQueryRepository } from './query/customization-query.repository';

export interface CustomizationRepositoryScope {
    getCustomizationRepository(): CustomizationRepository;
    getCustomizationQueryRepository(): CustomizationQueryRepository;
    getCustomizationColorRepository(): CustomizationColorRepository;
    getCustomizationColorQueryRepository(): CustomizationColorQueryRepository;
}
