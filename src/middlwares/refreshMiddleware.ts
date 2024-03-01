import ApiError from '../exception/ApiError';
import tokenService from '../services/TokenService';

const refreshMiddleware = (req, res, next) => {
  try {
    const refreshToken = req.headers.refresh;
    if (!refreshToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
};

export default refreshMiddleware;