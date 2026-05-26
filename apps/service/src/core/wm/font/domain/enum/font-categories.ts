export const fontCategories = {
    SERIF: 'serif',
    SANS_SERIF: 'sans-serif',
    MONOSPACE: 'monospace',
    DISPLAY: 'display',
    HANDWRITING: 'handwriting',
    SYMBOL: 'symbol',
} as const;

export type FontCategory = (typeof fontCategories)[keyof typeof fontCategories];
