import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class WorkspaceDescription extends StringValueObject {
    private readonly MAX_LENGTH = 2000;

    constructor(value: string) {
        super(value);

        this.ensureMaxLength();
    }

    private ensureMaxLength(): void {
        if (this.value.length > this.MAX_LENGTH) {
            throw new Error('Description is too long');
        }
    }
}