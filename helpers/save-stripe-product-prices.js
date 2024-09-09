import { Types } from 'mongoose';

import STRIPEAPI from '../services/stripe';

import SubscriptionPlan from '../models/subscription-plan';

const SaveStripeProductPrices = async ({
  productId,
  productName
}) => {
  const res = await STRIPEAPI({
    endpoint: 'ListPrice',
    params: {
      productId
    }
  });

  console.log('\n ### res of SaveStripeProductPrices ###', res);
  if (res) {
    const { data } = res || {};
    const writeData = data.map((obj) => {
      const {
        id: priceId,
        type,
        recurring,
        unit_amount: unitAmount,
        currency,
        nickname: subscriptionName = ''
      } = obj || {};

      const { interval } = recurring;

      return {
        updateOne: {
          filter: {
            productId,
            priceId
          },
          update: {
            $setOnInsert: {
              _id: Types.ObjectId().toHexString()
            },
            $set: {
              type,
              interval,
              unitAmount: unitAmount / 100,
              productName,
              subscriptionName,
              currency
            }
          },
          upsert: true
        }
      };
    });

    console.log('\n Saving stripe product prices', writeData.length);
    if (writeData.length) {
      await SubscriptionPlan.bulkWrite(writeData);
    }
  }
};

export default SaveStripeProductPrices;
