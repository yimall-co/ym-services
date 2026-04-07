import { GeolocationRepository } from '../domain/geolocation.repository';
import { GeolocationQueryRepository } from './query/geolocation-query.repository';

export interface GeolocationRepositoryScope {
    getGeolocationRepository(): GeolocationRepository;
    getGeolocationQueryRepository(): GeolocationQueryRepository;
}
