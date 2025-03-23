import { round } from "lodash";
import CheckIn from "../../models/check-in";
import moment from "moment";
import { Types } from "mongoose";

const SaveCheckIn = async ({
  userId,
  question1,
  question2,
  question3,
  question4,
  question5,
  question1Msg,
  question2Msg,
  question3Msg,
  question4Msg,
  question5Msg
}) => {
  // Calculate start and end of today
  const startOfDay = moment().startOf("day").toDate(); // Start of today (00:00:00)
  const endOfDay = moment().endOf("day").toDate(); // End of today (23:59:59)
  // Query MongoDB for records with today's date
  const alreadyCheckIn = await CheckIn.findOne({
    userId,
    createdAt: {
      $gte: startOfDay, // Greater than or equal to the start of the day
      $lte: endOfDay, // Less than or equal to the end of the day
    },
  }).lean();
  if (alreadyCheckIn) {
    return {
      message: "You have already Filled Check In Summary.",
    };
  }
  const emotional = round((question1 / 5) * 100, 2);
  const physical =
    (round((question2 / 5) * 100, 2) + round((question3 / 5) * 100, 2)) / 2;
  const behavioral =
    (round((question4 / 5) * 100, 2) + round((question5 / 5) * 100, 2)) / 2;

  const overallScore = round((emotional + physical + behavioral) / 3, 2);
  let intensityLevel = "Low";
  if (overallScore > 60) {
    intensityLevel = "Very Good";
  } else if (overallScore > 40) {
    intensityLevel = "Good";
  } else if (overallScore > 20) {
    intensityLevel = "Moderate";
  }

  const checkin = new CheckIn({
    _id: new Types.ObjectId().toHexString(),
    userId,
    emotional,
    physical,
    behavioral,
    overallScore,
    intensityLevel,
    question1Msg,
    question2Msg,
    question3Msg,
    question4Msg,
    question5Msg
  });
  await checkin.save();
  return checkin.toObject();
};

export default SaveCheckIn;
