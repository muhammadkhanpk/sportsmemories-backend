import NotificationSettings from "../../models/notification-setting";

const GetNotificationSettings = async({ userId }) => {
  const notif = await NotificationSettings.findOne({ userId }).lean();
  return notif;
}

export default GetNotificationSettings