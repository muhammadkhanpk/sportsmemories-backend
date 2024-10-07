import User from '../../models/user';

const UpdateCoachStatus = async ({
  userId,
  status
}) => {
  const user = await User.findOne({ _id: userId });
  if (user) {
    user.isCoachActive = status;
    await user.save();
    return user;
  }

  const err = new Error();
  err.message = 'Coach not found.';
  err.status = 400;

  throw err;
};

export default UpdateCoachStatus;
