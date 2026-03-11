import { CustomizationColor } from './customization-color';

export interface CustomizationColorRepository {
    save(customizationColor: CustomizationColor): Promise<void>;
}
