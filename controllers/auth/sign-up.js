import { Types } from 'mongoose';

import User from '../../models/user';

import { generateTokenResponse } from '../../middlewares/auth';
import { sendOTPEmail } from '../../utils/email-templates';
import { SendEmail } from '../../utils/send-email';
import { generateOTP } from '../../utils/helpers';

const SignUp = async ({
  name,
  email,
  password,
  skills,
  experience,
  bio,
  hourlyrate,
  role
}) => {
    let user = await User.findOne({ email });
    if (user) {
      const err = new Error();
      err.message = 'This Email is already taken';
      err.statusCode = 400;
      throw err;
    }

    const otp = generateOTP();

    user = new User({
      _id: new Types.ObjectId().toHexString(),
      name,
      email,
      password,
      skills,
      experience,
      bio,
      hourlyrate,
      role: role ? 'coach' : 'user',
      otp,
      status: 'Registered',
      otpVerified: false
    });
    await user.save();

  SendEmail(
    email,
    'Signup OTP Email!',
    sendOTPEmail({
        name,
        otp,
      })
  ).then(() => { console.log('email link is sended'); });


  return {
    success: true,
    message: 'SignUp Successfully!'
  };
};

export default SignUp;
