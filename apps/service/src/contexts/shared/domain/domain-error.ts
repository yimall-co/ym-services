export abstract class DomainError extends Error {
    private readonly _message: string;
    private readonly _code: string;

    constructor(message: string, code: string) {
        super(message);

        this._message = message;
        this._code = code;

        Object.setPrototypeOf(this, DomainError.prototype);
    }

    getCode(): string {
        return this._code;
    }

    getMessage(): string {
        return this._message;
    }
}
