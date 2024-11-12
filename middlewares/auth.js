import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

import User from '../models/user';

const { HASHING_SECRET_KEY } = process.env;

const generateTokenResponse = ({
  email
},
verify = false) => {
  const expiryTime = '365d';
  return {
    token: jwt.sign({ email }, HASHING_SECRET_KEY, {
      expiresIn: expiryTime
    })
  };
};

const loginCheck = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: info.error,
        susccess: false
      });
    } else {
      req.user = user;
    }
    next();
  })(req, res, next);
};

const LocalLoginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, {
          error: 'User with this email not found.'
        });
      }

      if (!user.otpVerified) {
        return done(null, false, {
          error: 'Your OTP details could not be verified. Please try again.'
        });
      }

      const isValid = user?.validatePassword(password);
      if (!isValid) {
        return done(null, false, {
          error: 'You have entered a wrong password'
        });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

const AuthenticateAuthToken = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      if (info?.message.includes('expired')) {
        return res.status(401).send({ success: false, message: 'Authentication token is expired' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized access.', success: false });
      }
      req.user = user;
      return next();
    }
  )(req, res, next);
};

const AuthenticationStrategy = new JWTstrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: HASHING_SECRET_KEY
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ email: jwtPayload.email });
      if (!user) return done(null, false);

      return done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

export {
  AuthenticationStrategy,
  AuthenticateAuthToken,
  generateTokenResponse,
  loginCheck,
  LocalLoginStrategy
};
