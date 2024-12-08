import User from '../../models/user';

const UpdateCoachStatus = async ({
  userId,
  status
}) => {
  let user = await User.findOne({ _id: userId });
  if (user) {
    const updatedStatusCoach = await User.findOneAndUpdate({
      _id: userId
    }, {
      $set: {
        isCoachActive: Boolean(status)
      }
    }, {
      new: true
    })
    return updatedStatusCoach.toObject();
  }

  const err = new Error();
  err.message = 'Coach not found.';
  err.status = 400;

  throw err;
};

export default UpdateCoachStatus;
