import Stripe from 'stripe';

const StripeConfiguration = (stripeSecretKey) => {
  const stripe = new Stripe(stripeSecretKey);

  return stripe;
};

export default StripeConfiguration;
