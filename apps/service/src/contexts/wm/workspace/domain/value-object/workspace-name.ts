import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class WorkspaceName extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsNotEmpty();
    }

    private ensureIsNotEmpty(): void {
        if (this.isEmpty()) {
            throw new Error('Workspace name cannot be empty');
        }
    }
}
