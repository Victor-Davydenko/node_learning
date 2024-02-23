import ApiError from '../exception/ApiError';

export const errorMiddlware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 500,
    message: 'An internal error has occurred...'
  });
};