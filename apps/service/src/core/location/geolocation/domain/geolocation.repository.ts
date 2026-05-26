import { Geolocation } from './geolocation';

export interface GeolocationRepository {
    existsByShopId(shopId: string): Promise<boolean>;
    save(geolocation: Geolocation): Promise<void>;
}
