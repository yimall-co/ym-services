import { DomainError } from 'shared/domain/domain-error';

export class GeolocationNotFound extends DomainError {
    constructor() {
        super('Geolocation not found', 'GEOLOCATION_NOT_FOUND');
    }
}
