export const colorValues = {
    PRIMARY: 'primary',
    PRIMARY_ALT: 'primary_alt',
    SECONDARY: 'secondary',
    SECONDARY_ALT: 'secondary_alt',
    BACKGROUND: 'background',
    FOREGROUND: 'foreground',
    BACKGROUND_DARK: 'background_dark',
    FOREGROUND_DARK: 'foreground_dark',
    BORDER: 'border',
    BORDER_DARK: 'border_dark',
} as const;

export type ColorValue = (typeof colorValues)[keyof typeof colorValues];
