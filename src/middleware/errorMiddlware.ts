import ApiError from '../exception/exception';

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

export default errorMiddleware;