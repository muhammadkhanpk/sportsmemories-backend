const CreatePaymentIntent = async ({
  currency,
  amount,
  stripe
}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    return paymentIntent.client_secret
  } catch (error) {
    throw error
  }
};

export default CreatePaymentIntent;
