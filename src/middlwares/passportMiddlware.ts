import { Strategy, ExtractJwt } from 'passport-jwt';
import userService from '../services/UserService';

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
};

const strategy =  (passport) => {
  passport.use(
    new Strategy(option, async (payload, done) => {
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