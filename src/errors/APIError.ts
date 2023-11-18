export class APIError extends Error{
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    };

    toJSON() {
        return {
            status: this.status,
            message: this.message,
        };
    };
}