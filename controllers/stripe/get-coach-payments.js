import Payment from "../../models/payment";

const GetCoachPayments = async ({ coachId }) => {
  const payments = await Payment.find({
    coachId
  }).lean();
  return payments;
}

export default GetCoachPayments;