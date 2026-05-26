export const fonts = {
    MONO: 'mono',
    SERIF: 'serif',
    SANS_SERIF: 'sans-serif',
} as const;

export type Font = (typeof fonts)[keyof typeof fonts];
