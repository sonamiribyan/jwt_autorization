class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Bad Request') {
        return new ApiError(message, 400);
    }
    static unauthorizedError(message = 'unautorizedError') {
        return new ApiError(message, 401);
    }
}

export default ApiError;
