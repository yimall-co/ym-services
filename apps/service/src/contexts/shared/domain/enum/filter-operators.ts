export const filterOperators = {
    EQUAL: '=',
    NOT_EQUAL: '!=',
    GT: '>',
    GTE: '>=',
    LT: '<',
    LTE: '<=',
    CONTAINS: 'CONTAINS',
    NOT_CONTAINS: 'NOT_CONTAINS',
    STARTS_WITH: 'STARTS_WITH',
    ENDS_WITH: 'ENDS_WITH',
    IN: 'IN',
    NOT_IN: 'NOT_IN',
} as const;

export type FilterOperators = (typeof filterOperators)[keyof typeof filterOperators];
