const ChargeCustomer = async ({
  stripe,
  stripeUserId
}) => {
  const response = await stripe.charges.create({
    amount: 100,
    currency: 'usd',
    customer: stripeUserId
  });

  return response;
};

export default ChargeCustomer;
