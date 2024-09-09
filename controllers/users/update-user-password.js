import User from '../../models/user';

const UpdateUserPassword = async ({
  userId,
  password
}) => {
  const user = await User.findOne({ _id: userId });
  if (user && password) {
    user.password = password;

    await user.save();

    return 'Password Updated Successfully!';
  }

  const err = new Error();
  err.message = 'User not found';
  err.status = 400;

  throw err;
};

export default UpdateUserPassword;
