import { ColorRepository } from 'wm/color/domain/color.repository';
import { ColorQueryRepository } from 'wm/color/application/query/color-query.repository';

import { CustomizationRepository } from '../domain/customization.repository';
import { CustomizationQueryRepository } from './query/customization-query.repository';

export interface CustomizationRepositoryScope {
    getCustomizationRepository(): CustomizationRepository;
    getCustomizationQueryRepository(): CustomizationQueryRepository;
    getColorRepository(): ColorRepository;
    getColorQueryRepository(): ColorQueryRepository;
}
