import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { CustomizationDto } from './dto';
import { GetCustomizationsQuery } from './query';

export class GetCustomizationsQueryHandler implements QueryHandler<
    GetCustomizationsQuery,
    Array<CustomizationDto>
> {
    subscribedTo(): Query {
        return GetCustomizationsQuery;
    }

    handle(query: GetCustomizationsQuery): Promise<Array<CustomizationDto>> {
        throw new Error('Method not implemented.');
    }
}
