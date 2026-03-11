import { Customization } from './customization';

export interface CustomizationRepository {
    save(customization: Customization): Promise<void>;
}
