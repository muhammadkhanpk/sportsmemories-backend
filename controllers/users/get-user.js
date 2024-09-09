import User from '../../models/user';

const GetUser = async ({ userId }) => {
  const user = await User.findOne({ _id: userId });

  return user;
};

export default GetUser;
