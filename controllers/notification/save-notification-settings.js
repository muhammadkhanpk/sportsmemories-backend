import { Types } from "mongoose";
import NotificationSettings from "../../models/notification-setting";

const SaveNotificationSettings = async ({
  inbox,
  events,
  promotions,
  account,
  userId,
}) => {
  const updatedNoti = await NotificationSettings.findOneAndUpdate(
    { userId },
    {
      $setOnInsert: {
        _id: new Types.ObjectId().toHexString(),
      },
      $set: {
        inbox,
        events,
        promotions,
        account,
      },
    },
    {
      upsert: true,
      new: true, // Return the modified document
    }
  ).lean();
  return updatedNoti;
};

export default SaveNotificationSettings;
