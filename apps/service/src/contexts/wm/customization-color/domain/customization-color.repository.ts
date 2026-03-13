import { CustomizationColorId } from 'wm/shared/domain/customization-color-id';
import { CustomizationColor } from './customization-color';

export interface CustomizationColorRepository {
    save(customizationColor: CustomizationColor): Promise<void>;
    update(id: CustomizationColorId, customizationColor: CustomizationColor): Promise<void>;
}
