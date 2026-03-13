import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { CustomizationByIdDto } from './get-customization-by-id.dto';
import { GetCustomizationByIdQuery } from './get-customization-by-id.query';
import { CustomizationQueryRepository } from '../customization-query.repository';

export class GetCustomizationByIdQueryHandler implements QueryHandler<
    GetCustomizationByIdQuery,
    CustomizationByIdDto
> {
    constructor(private readonly customizationQueryRepository: CustomizationQueryRepository) { }

    subscribedTo(): Query {
        return GetCustomizationByIdQuery;
    }

    async handle(query: GetCustomizationByIdQuery): Promise<CustomizationByIdDto> {
        const customization = await this.customizationQueryRepository.findOneById(query.id);
        if (!customization) {
            throw new Error(`Customization by id ${query.id} not found`);
        }

        return customization;
    }
}
