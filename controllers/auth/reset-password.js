import { Types } from 'mongoose';

import User from '../../models/user';

import { generateTokenResponse } from '../../middlewares/auth';
import { sendOTPEmail } from '../../utils/email-templates';
import { SendEmail } from '../../utils/send-email';
import { generateOTP } from '../../utils/helpers';

const ResetPassword = async ({ email }) => {
    let user = await User.findOne({ email });
    if (!user) {
      const err = new Error();
      err.message = 'Email is incorrect.';
      err.statusCode = 400;
      throw err;
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 30 * 60 * 1000;

    await User.updateOne({
      email
    }, {
      $set: {
        otpExpires,
        otp
      }
    })

  SendEmail(
    email,
    'Reset Password OTP!',
    sendOTPEmail({
      name: user.name,
      otp,
      isResetPassword: true
    })
  ).then(() => { console.log('email link is sended'); });
};

export default ResetPassword;
