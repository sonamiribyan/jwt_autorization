import Joi from 'joi';

// Define your Joi schema for registration endpoint validation
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    // Add more validations as needed
});

export default registerSchema;
