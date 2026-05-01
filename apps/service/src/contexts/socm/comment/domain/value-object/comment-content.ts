import { StringValueObject } from 'shared/domain/value-object/string.value-object';

export class CommentContent extends StringValueObject {
    static readonly MIN_LENGTH = 1;
    static readonly MAX_LENGTH = 1000;

    constructor(value: string) {
        super(value);

        this.ensureIsValidLength();
    }

    private ensureIsValidLength(): void {
        if (
            this.value.length < CommentContent.MIN_LENGTH ||
            this.value.length > CommentContent.MAX_LENGTH
        ) {
            throw new Error('Invalid comment content length');
        }
    }
}
