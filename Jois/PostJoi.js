import Joi from 'joi';

const postStoreSchema = Joi.object({
    title: Joi.string().required(),
    descriprion: Joi.string().required(),
});
const postUpdateSchema = Joi.object({
    title: Joi.string().required(),
    descriprion: Joi.string().required(),
    user_id: Joi.string().required(),
});

export { postStoreSchema, postUpdateSchema };