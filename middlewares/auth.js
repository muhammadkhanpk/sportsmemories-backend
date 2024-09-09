import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

import User from '../models/user';

const { HASHING_SECRET_KEY } = process.env;

const GenerateTokenForPasswordResetLink = ({
  userId,
  email,
  name
},
verify = false) => {
  const expiryTime = '1d';
  return {
    token: jwt.sign({ userId, email, name }, HASHING_SECRET_KEY, {
      expiresIn: expiryTime
    }),
    userId
  };
};

const GenerateTokenForInviteUser = ({
  email
},
verify = false) => {
  const expiryTime = '3d';
  return {
    token: jwt.sign({ email }, HASHING_SECRET_KEY, {
      expiresIn: expiryTime
    })
  };
};

const generateTokenResponse = ({
  email
},
verify = false) => {
  const expiryTime = '7d';
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
        error: info.error,
        susccess: false
      });
    } else {
      req.user = user;
    }
    next();
  })(req, res, next);
};

const checkUserSession = async (req, res, next) => {
  let token = req.header('Authorization');

  if (token.includes('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  const loggedInUser = req.user;

  if (!loggedInUser.token && loggedInUser.role !== 'admin') {
    loggedInUser.token = token;

    await User.updateOne({
      email: loggedInUser.email
    }, {
      $set: {
        token
      }
    });
  }

  if (token === loggedInUser.token || loggedInUser.role === 'admin' || loggedInUser.email === 'bizwithpurpose@gmail.com' || loggedInUser.email === 'team@qbatch.com') {
    next();
  } else {
    return res.status(401).json({ message: 'You are login on a new device', success: false });
  }
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
      console.log('user data is ', {email, password})
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
      if (err) {
        return res.status(404).send({ success: false, error: err?.message });
      }
      if (!user) {
        return res.status(404).json({ error: 'Your session has been expired!', success: false });
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
      const user = await User.findById(jwtPayload.userId);
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
  GenerateTokenForPasswordResetLink,
  GenerateTokenForInviteUser,
  generateTokenResponse,
  loginCheck,
  LocalLoginStrategy,
  checkUserSession
};
