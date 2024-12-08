import STRIPEAPI from "../../services/stripe";

const CreatePaymentIntent = async ({
  currency,
  amount
}) => {
  const intent = await STRIPEAPI({
    endpoint: 'CreatePaymentIntent',
    params: {
      currency,
      amount
    }
  })
  return intent
}

export default CreatePaymentIntent;