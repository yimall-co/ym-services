import { Customization } from 'wm/customization/domain/customization';
import { CustomizationRepository } from 'wm/customization/domain/customization.repository';
import { SocialMediaPrimitives } from 'wm/customization/domain/social-media';
import { DrizzleRepository } from 'shared/infrastructure/persistence/drizzle/drizzle.repository';

import { customizations } from './drizzle/customizations.table';

export class DrizzleCustomizationRepository
    extends DrizzleRepository<typeof customizations>
    implements CustomizationRepository {
    protected readonly table = customizations;

    async save(customization: Customization): Promise<void> {
        await this.client.insert(this.table).values({
            ...customization.toPrimitives(),
            fontPrimary: 'Poppins',
            fontSecondary: 'Raleway',
        });
    }
}
