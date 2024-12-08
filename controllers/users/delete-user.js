import User from '../../models/user';

const DeleteUser = async ({ userId }) => {
  await User.deleteOne({ _id: userId })
};

export default DeleteUser;
