import { Types } from 'mongoose';

import User from '../../models/user';

import { sendOTPEmail } from '../../utils/email-templates';
import { SendEmail } from '../../utils/send-email';
import { generateOTP } from '../../utils/helpers';

const SignUp = async ({
  email,
  firstName,
  lastName,
  sportsClubName,
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
    const isCoachActive = role === 'coach' ? false : undefined 

    user = new User({
      _id: new Types.ObjectId().toHexString(),
      email,
      firstName,
      lastName,
      sportsClubName,
      password,
      skills,
      experience,
      bio,
      hourlyrate,
      role: role ? 'coach' : 'user',
      otp,
      status: 'Registered',
      otpVerified: false,
      isCoachActive
    });
    await user.save();

  SendEmail(
    email,
    'Signup OTP Email!',
    sendOTPEmail({
        name: `${firstName} ${lastName}`,
        otp,
      })
  ).then(() => { console.log('email link is sended'); });


  return {
    success: true,
    message: 'SignUp Successfully!'
  };
};

export default SignUp;
