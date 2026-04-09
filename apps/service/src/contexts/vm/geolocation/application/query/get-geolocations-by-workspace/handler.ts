import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';
import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { GeolocationNotFound } from 'vm/geolocation/domain/error/geolocation-not-found';

import { GeolocationByWorkspaceDto } from './dto';
import { GetGeolocationsByWorkspaceQuery } from './query';
import { GeolocationRepositoryScope } from '../../geolocation.repository-scope';

export class GetGeolocationsByWorkspaceQueryHandler implements QueryHandler<
    GetGeolocationsByWorkspaceQuery,
    Array<GeolocationByWorkspaceDto>
> {
    constructor(private readonly uow: UnitOfWork<GeolocationRepositoryScope>) { }

    subscribedTo(): Query {
        return GetGeolocationsByWorkspaceQuery;
    }

    async handle(
        query: GetGeolocationsByWorkspaceQuery,
    ): Promise<Array<GeolocationByWorkspaceDto>> {
        return this.uow.withTransaction(async (scope) => {
            const geolocationQueryRepository = scope.getGeolocationQueryRepository();

            const geolocations = await geolocationQueryRepository.findByWorkspace(
                query.workspaceId,
            );
            if (!geolocations || geolocations.length === 0) {
                throw new GeolocationNotFound();
            }

            return geolocations;
        });
    }
}
