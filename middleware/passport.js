import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import EmpleadoModel from '../models/empleadoModel.js';

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor
  ]),
  secretOrKey: process.env.SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const empleado = await EmpleadoModel.getByUsername(jwt_payload.username);
    if (empleado) {
      return done(null, empleado);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));

export default passport;
