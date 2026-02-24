import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class WorkspaceDescription extends StringValueObject {
    private readonly MAX_LENGTH = 2000;

    constructor(value: string | null) {
        super(value ?? '');

        this.ensureMaxLength();
    }

    isEmpty(): boolean {
        return this.value.length === 0;
    }

    private ensureMaxLength(): void {
        if (this.value.length > this.MAX_LENGTH) {
            throw new Error('Description is too long');
        }
    }
}