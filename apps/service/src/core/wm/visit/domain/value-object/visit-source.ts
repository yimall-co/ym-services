import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export const sourceValue = {
    WEB: 'web',
    QR: 'qr',
    UNKNOWN: 'unknown',
} as const;

export type SourceValue = (typeof sourceValue)[keyof typeof sourceValue];

export class VisitSource extends EnumValueObject<SourceValue> {
    constructor(value: SourceValue) {
        super(value, Object.values(sourceValue));
    }
}
