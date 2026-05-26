import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class WorkspaceDescription extends StringValueObject {
    static readonly maxLength = 2000;

    constructor(value: string | null) {
        super(value ?? '');

        this.ensureMaxLength();
    }

    private ensureMaxLength(): void {
        if (this.value.length > WorkspaceDescription.maxLength) {
            throw new Error('Description is too long');
        }
    }
}
