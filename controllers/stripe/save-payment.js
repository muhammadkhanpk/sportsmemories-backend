import { Types } from 'mongoose';
import Payment from '../../models/payment';

const SavePayment = async({
  userId,
  coachId,
  amount,
  currency = 'usd',
  data = {}
}) => {
  const payment = new Payment({
    _id: new Types.ObjectId().toHexString(),
    userId,
    coachId,
    amount,
    currency,
    ...data
  });
  await payment.save();
  return payment.toObject();
}

export default SavePayment