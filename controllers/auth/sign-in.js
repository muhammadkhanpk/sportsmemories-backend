import User from '../../models/user';

import { generateTokenResponse } from '../../middlewares/auth';

const SignIn = async ({ email }) => {  
  const response = generateTokenResponse({
    email
  });
  const user = await User.findOne({ email }).lean();
  return {
    ...response,
    ...user
  }
};

export default SignIn;
