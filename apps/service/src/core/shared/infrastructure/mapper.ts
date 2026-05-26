/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class Mapper {
    static toDomain<TPrimitive, TDomain>(primitives: TPrimitive): TDomain {
        throw new Error('Method not implemented');
    }

    static toPersistence<TDomain, TPrimitive>(domain: TDomain): TPrimitive {
        throw new Error('Method not implemented');
    }
}
