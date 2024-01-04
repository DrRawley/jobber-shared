import { StatusCodes } from 'http-status-codes';

//Create error response interface
export interface IErrorResponse {
    message: string;
    statusCode: number;
    status: string;
    comingFrom: string;
    serializeError(): IError;
}

export interface IError {
    message: string;
    statusCode: number;
    status: string;
    comingFrom: string;
}

//Create abstract class from js error class
export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;
    comingFrom: string;

    constructor(message: string, comingFrom: string) {
        super(message);
        this.comingFrom = comingFrom;
    }

    serializeError(): IError {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            comingFrom: this.comingFrom
        }
    }
}

//Bad request error 400
export class BadRequestError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

//Not found error 404
export class NotFoundError extends CustomError {
    statusCode = StatusCodes.NOT_FOUND;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

//Not authorized error 401
export class NotAuthorizedError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

//File too large error 413
export class FileTooLargeError extends CustomError {
    statusCode = StatusCodes.REQUEST_TOO_LONG;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

//Server error 503
export class ServerError extends CustomError {
    statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    status = 'error';

    constructor(message: string, comingFrom: string) {
        super(message, comingFrom);
    }
}

//Error number exception
export interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
}