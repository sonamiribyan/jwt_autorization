import ApiError from '../exceptions/ApiError.js';

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;

    if (!(err instanceof ApiError)) {
        statusCode = 500;
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            statusCode,
        },
    });
};

export default errorHandler;
