import ApiError from '../exceptions/ApiError.js';

// Middleware function to validate requests
const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        // If validation fails, create an ApiError with a 400 status code
        next(ApiError.badRequest(error.details[0].message));
    } else {
        // If validation passes, proceed to the next middleware
        next();
    }
};

export default validateRequest;
