export const pronoun = {
    HE_HIM: 'he/him',
    SHE_HER: 'she/her',
    THEY_THEM: 'they/them',
} as const;

export type Pronoun = (typeof pronoun)[keyof typeof pronoun];
