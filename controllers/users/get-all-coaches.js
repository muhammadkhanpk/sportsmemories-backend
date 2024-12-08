import User from '../../models/user';
import Payment from '../../models/payment';
import moment from 'moment';  // Importing moment

const GetAllCoaches = async ({ userId }) => {
  try {
    // Fetch all coaches excluding the current user
    const allCoaches = await User.find({ role: 'coach', _id: { $ne: userId } });

    // Check if the user has an active and valid payment for each coach
    const coachesWithPaymentStatus = await Promise.all(
      allCoaches.map(async (coach) => {
        // Find an active payment for the user and coach
        const payment = await Payment.findOne({
          userId,
          coachId: coach._id,
          isPaymentActive: true,
        });

        // Check if the payment is still valid (within the last 30 days)
        const isPaid = payment && moment(payment.createdAt).isAfter(moment().subtract(30, 'days'));

        // If payment is expired, update its status to 'expired'
        if (payment && !isPaid) {
          await Payment.updateOne(
            { _id: payment._id },
            { $set: { isPaymentActive: false } }
          );
        }

        // Add 'isPaid' to the coach's data
        return { ...coach.toObject(), isPaid };
      })
    );

    console.log('all coaches data', coachesWithPaymentStatus)

    return coachesWithPaymentStatus;

  } catch (error) {
    console.error('Error fetching coaches with payment status:', error);
    throw new Error('Could not retrieve coaches with payment status');
  }
};

export default GetAllCoaches;
