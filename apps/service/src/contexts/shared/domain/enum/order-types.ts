export const orderTypes = {
    ASC: 'asc',
    DESC: 'desc',
    NONE: 'none',
} as const;

export type OrderTypes = (typeof orderTypes)[keyof typeof orderTypes];
