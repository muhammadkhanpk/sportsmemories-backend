import Feedbacks from "../../models/Feedbacks";

const GetAllFeedbacks = async() => {
  const feedbacks = await Feedbacks.find({}).lean();
  return feedbacks;
}

export default GetAllFeedbacks