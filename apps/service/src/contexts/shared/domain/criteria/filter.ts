import { FilterField } from './filter-field';
import { FilterOperator } from './filter-operator';
import { FilterValue } from './filter-value';

export class Filter {
    readonly field: FilterField;
    readonly operator: FilterOperator;
    readonly value: FilterValue;

    constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }

    static fromValues(values: Map<string, string>): Filter {
        const filed = values.get('field');
        const operator = values.get('operator');
        const value = values.get('value');

        if (!filed || !operator || !value) {
            throw new Error('Filter values are required');
        }

        return new Filter(
            FilterField.fromValue(filed),
            FilterOperator.fromValue(operator),
            FilterValue.fromValue(value),
        );
    }
}
