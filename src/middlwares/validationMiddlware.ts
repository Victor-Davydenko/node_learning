import ApiError from '../exception/ApiError';

export const validationMiddleware = (schema) => (req, res, next) => {
  const userData = req.body;

  const { error } = schema.validate(userData);
  if (error) {
    next(ApiError.BadCredentials(error.message));
  }

  next();
};