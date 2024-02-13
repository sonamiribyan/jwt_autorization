import ApiError from '../exceptions/ApiError.js';

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        next(ApiError.badRequest(error.details[0].message));
    } else {
        next();
    }
};

export default validateRequest;
