import User from '../../models/user';

const UpdateUserPassword = async ({
  userId,
  newPassword,
  oldPassword
}) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error('User not found!')
  }
  if (user && newPassword && oldPassword) {
    const isValidPassword = user.validatePassword(oldPassword);

    if (isValidPassword) {
      user.password = newPassword;
      await user.save();
    } else {
      const err = new Error();
      err.message = 'Your old password is not valid';
      err.status = 400;

      throw err;
    }
  } 
};

export default UpdateUserPassword;
