import User from '../../models/user';

const ChangePassword = async ({
  email,
  password,
  otp
}) => {
  const user = await User.findOne({ email, otp });
  if (user && password) {
    user.password = password;
    user.otp = null;
    user.otpExpires= null;
    await user.save();
    return;
  }

  const err = new Error();
  err.message = 'You have entered wrong credentials.';
  err.status = 400;

  throw err;
};

export default ChangePassword;
