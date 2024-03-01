import { Strategy, ExtractJwt } from 'passport-jwt';
import userService from '../services/UserService';

const accessOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
};

const refreshOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_REFRESH_SECRET,
};

const strategy =  (passport) => {
  passport.use(
    'jwt_access',
    new Strategy(accessOption, async (payload, done) => {
      const { id } = payload;
      try {
        const user = userService.findUser(id);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    }),
  );

  passport.use(
    'jwt_refresh',
    new Strategy(refreshOption, async (payload, done) => {
      const { id } = payload;
      try {
        const user = userService.findUser(id);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    }),
  );
};

export default strategy;