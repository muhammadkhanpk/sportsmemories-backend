import { Types } from 'mongoose';
import Feedbacks from '../../models/Feedbacks';

const AddFeedback = async({
  userId,
  name,
  email,
  message
}) => {
  const feedback = new Feedbacks({
    _id: new Types.ObjectId().toHexString(),
    name,
    email,
    message,
    userId
  });
  await feedback.save();
  return feedback.toObject();
}

export default AddFeedback;
