export class ResponseSender {
    public readonly statusCode: number;
    public readonly data: string;

    constructor(statusCode = 200, data: any) {
        this.statusCode = statusCode;
        this.data = data;
    }
}
