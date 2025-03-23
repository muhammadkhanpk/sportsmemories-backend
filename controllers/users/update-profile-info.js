import { extend } from 'lodash';

import User from '../../models/user';

const UpdateProfileInfo = async ({
  firstName,
  lastName,
  sportsClubName,
  profileImage,
  bio,
  userId,
  payPalEmail,
  fcmToken
}) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error('User not found!')
  }

  const updatedUser = await User.findOneAndUpdate({
    _id: userId  
  }, {
    $set: {
      firstName,
      lastName,
      sportsClubName,
      profileImage,
      bio,
      payPalEmail,
      fcmToken
    }
  }, {
    new: true,
  })
  return updatedUser.toObject();
};

export default UpdateProfileInfo;
