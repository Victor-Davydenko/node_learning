import ApiError from '../exception/exception';

export const postValidationMiddleware = (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    throw ApiError.NotValidPostBody(400, 'Not valid body or title of post!');
  }
  next();
};