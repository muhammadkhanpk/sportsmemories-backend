import { extend } from 'lodash';

import User from '../../models/user';

const UpdateProfileInfo = async ({
  userId,
  name,
  newPassword,
  oldPassword
}) => {
  const setObj = {};

  if (name) {
    extend(setObj, { name });
  }

  const user = await User.findOne({ _id: userId });

  if (user && newPassword && oldPassword) {
    const isValidPassword = user.validatePassword(oldPassword);

    if (isValidPassword) {
      user.name = name;
      user.password = newPassword;
      await user.save();
    } else {
      const err = new Error();
      err.message = 'Your old password is not valid';
      err.status = 400;

      throw err;
    }
  } else {
    await User.updateOne({ _id: userId }, {
      $set: {
        ...setObj
      }
    });
  }
};

export default UpdateProfileInfo;
