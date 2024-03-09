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

export const postValidationSchema = Joi.object({
  title: Joi.string()
    .required(),
  body: Joi.string()
    .required()
});

export const updatePostValidationSchema = Joi.object({
  title: Joi.string()
    .required(),
  body: Joi.string()
    .required(),
  owner: Joi.string()
    .required()
});

export const updatePostPropertyValidationSchema = Joi.object({
  title: Joi.string()
    .optional(),
  body: Joi.string()
    .optional(),
  owner: Joi.string()
    .required()
}).or('title', 'body');