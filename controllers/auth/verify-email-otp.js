import User from '../../models/user';

const VerifyOtp = async ({ email, otp }) => {  
  const user = await User.findOne({
    email,
    otp
  });
  
  if (!user) {
    const error = new Error('Your Email or OTP is not correct.');
    error.statusCode = 401;
    throw error; 
  }

  if (user?.otpExpires && Date.now() > user.otpExpires) {
    const error = new Error('Your OTP is expired. Generate a new one.');
    error.statusCode = 401;
    throw error; 
  }

  await User.updateOne({
      email,
      otp
    },
    {
      $set:{
        otpVerified: true,
        otp: null,
        otpExpires: null
    }
  })
};

export default VerifyOtp;
