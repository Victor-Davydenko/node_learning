import passport from 'passport';
import ApiError from '../exception/ApiError';
const authMiddlware = (req, res, next) => {
  passport.authenticate('jwt',{ session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw ApiError.UnauthorizedError();
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authMiddlware;