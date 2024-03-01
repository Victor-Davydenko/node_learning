import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../db/models/userModel';

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
        const user = await UserModel.findById(id);
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
        const user = await UserModel.findById(id);
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