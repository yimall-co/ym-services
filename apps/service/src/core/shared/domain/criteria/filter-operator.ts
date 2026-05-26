import { filterOperators, FilterOperators } from '../enum/filter-operators';
import { EnumValueObject } from '../value-object/enum.value-object';

export class FilterOperator extends EnumValueObject<FilterOperators> {
    constructor(value: FilterOperators) {
        super(value, Object.values(filterOperators));
    }

    static fromValue(value: string): FilterOperator {
        for (const filterOperatorValue of Object.values(filterOperators)) {
            if (filterOperatorValue === value) {
                return new FilterOperator(value);
            }
        }

        throw new Error(`Invalid filter operator: ${value}`);
    }

    static equal(): FilterOperator {
        return this.fromValue(filterOperators.EQUAL);
    }

    static notEqual(): FilterOperator {
        return this.fromValue(filterOperators.NOT_EQUAL);
    }

    static greaterThan(): FilterOperator {
        return this.fromValue(filterOperators.GT);
    }

    static greaterThanOrEqual(): FilterOperator {
        return this.fromValue(filterOperators.GTE);
    }

    static lessThan(): FilterOperator {
        return this.fromValue(filterOperators.LT);
    }

    static lessThanOrEqual(): FilterOperator {
        return this.fromValue(filterOperators.LTE);
    }

    static contains(): FilterOperator {
        return this.fromValue(filterOperators.CONTAINS);
    }

    static notContains(): FilterOperator {
        return this.fromValue(filterOperators.NOT_CONTAINS);
    }

    static startsWith(): FilterOperator {
        return this.fromValue(filterOperators.STARTS_WITH);
    }

    static endsWith(): FilterOperator {
        return this.fromValue(filterOperators.ENDS_WITH);
    }

    static in(): FilterOperator {
        return this.fromValue(filterOperators.IN);
    }

    static notIn(): FilterOperator {
        return this.fromValue(filterOperators.NOT_IN);
    }

    isPositive(): boolean {
        return (
            this.value !== filterOperators.NOT_EQUAL && this.value !== filterOperators.NOT_CONTAINS
        );
    }
}
