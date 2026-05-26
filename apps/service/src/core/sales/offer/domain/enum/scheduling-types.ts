export const schedulingTypes = {
    PROVIDER: 'provider',
    CAPACITY: 'capacity',
} as const;

export type SchedulingTypes = (typeof schedulingTypes)[keyof typeof schedulingTypes];
