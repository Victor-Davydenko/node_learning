import Joi from 'joi';

export const createUserValidationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .alphanum()
    .min(7)
    .max(16)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

export const loginUserValidationSchema = Joi.object({
  username: Joi.string()
    .required(),

  password: Joi.string()
    .required(),
});