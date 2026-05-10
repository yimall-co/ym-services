export const gender = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
} as const;

export type Gender = (typeof gender)[keyof typeof gender];
