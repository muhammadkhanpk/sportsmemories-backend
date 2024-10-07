import User from '../../models/user';

const GetAllCoaches = async () => {
  const allcoaches = await User.findOne({ role: 'coach' });
  return allcoaches;
};

export default GetAllCoaches;
