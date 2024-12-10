import CheckIn from "../../models/check-in";
import moment from "moment";

const GetCheckIn = async ({ userId }) => {
  // Calculate start and end of today
  const startOfDay = moment().startOf("day").toDate(); // Start of today (00:00:00)
  const endOfDay = moment().endOf("day").toDate(); // End of today (23:59:59)

  // Query MongoDB for records with today's date
  const checkin = await CheckIn.findOne({
    userId,
    createdAt: {
      $gte: startOfDay, // Greater than or equal to the start of the day
      $lte: endOfDay, // Less than or equal to the end of the day
    },
  }).lean();

  return checkin ?{
    ...checkin,
    userNeedToSubmit: false,
  } : {
    emotional:0,
    physical:0,
    behavioral:0,
    overallScore:0,
    intensityLevel:'Low',
    userNeedToSubmit: true,
  }
};
export default GetCheckIn;
