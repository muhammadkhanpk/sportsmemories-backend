import User from '../../models/user';

const GetAllUsers = async () => {
  const allUsers = await User.find({ role: 'user' });
  return allUsers;
};

export default GetAllUsers;
