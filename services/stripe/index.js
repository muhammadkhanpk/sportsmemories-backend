import { extend } from 'lodash';

import StripeConfiguration from '../../config/stripe';

import * as StripeEndpoints from './endpoints';

const {
  LOCAL_STRIPE_SECRET_KEY,
  PROD_STRIPE_SECRET_KEY
} = process.env;

const stripeSecretKey = process.env.NODE_ENV === 'development' ? LOCAL_STRIPE_SECRET_KEY : PROD_STRIPE_SECRET_KEY;
// const stripeSecretKey = LOCAL_STRIPE_SECRET_KEY;

// Configure SpApi configuration params and Api params
const STRIPEAPI = async ({ endpoint, params }) => {
  try {
    const {
      stripeUserId,
      productId,
      priceId,
      subscriptionId,
      trialDaysAvailed,
      couponCode,
      quantity
    } = params || {};

    const stripe = StripeConfiguration(stripeSecretKey);
    console.log('\n\n Params ', params);
    console.log({
      stripeSecretKey
    });

    extend(params, {
      stripe,
      stripeSecretKey,
      stripeUserId,
      productId,
      priceId,
      subscriptionId,
      trialDaysAvailed,
      couponCode,
      quantity
    });

    console.log('Invoke Stripe Endpoint', endpoint);

    const response = await StripeEndpoints[endpoint](params);
    return response;
  } catch (e) {
    console.log('Error => ', e);
    throw new Error(e.message || e);
  }
};

export default STRIPEAPI;
