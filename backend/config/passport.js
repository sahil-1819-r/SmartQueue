import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.model.js';

const configurePassport = (passport) => {
  // Validate JWT_SECRET before configuring JWT strategy
  if (!process.env.JWT_SECRET) {
    throw new Error(
      'JWT_SECRET is not defined in environment variables. Please create a .env file with JWT_SECRET set.'
    );
  }

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) return done(null, false, { message: 'Invalid credentials' });
          const isMatch = await user.comparePassword(password);
          if (!isMatch) return done(null, false, { message: 'Invalid credentials' });
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.sub);
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

export default configurePassport;
