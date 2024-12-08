import Payment from "../../models/payment";

const GetAllPayments = async ({}) => {
  const payments = await Payment.find({}).lean();
  return payments;
}

export default GetAllPayments;