export const ONE_MINUTE = 1 * 60;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export const ONE_WEEK = 7 * ONE_DAY;

export function getHours(length: number) {
    return length * ONE_HOUR;
}
