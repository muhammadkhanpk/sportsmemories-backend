import { extend } from 'lodash';
import moment from 'moment';

const CreateSubscription = async ({
  stripe,
  stripeUserId,
  priceId,
  trialDaysAvailed,
  couponCode,
  quantity,
  subscriptionType,
  subscriptionPlan,
  userCreatedAtDate
}) => {
  const today = moment(); // Current date
  const givenDate = moment(userCreatedAtDate); // The date you provided
  const usedTrialDays = today.diff(givenDate, 'days');
  let discountCoupon;
  if (couponCode && (couponCode !== '15DayExtended' && couponCode !== '30DayExtended') && subscriptionType !== 'Lite' && subscriptionPlan !== 'yearly') {
    try{
      discountCoupon = await stripe.coupons.retrieve(couponCode);
    } catch(e) {
      const promotionCodes = await stripe.promotionCodes.list({
        code: couponCode
      });
      discountCoupon = promotionCodes?.data[0];
      if (discountCoupon && !discountCoupon?.active) {
        throw 'This promotion code has been expired.'
      }
      discountCoupon = promotionCodes?.data[0].coupon;
      if (!discountCoupon) {
        throw 'No such coupon found.'
      }
    }
  }

  const itemObj = { price: priceId };
  if (quantity) {
    extend(itemObj, { quantity });
  }

  const body = {
    customer: stripeUserId,
    items: [itemObj],
    collection_method: 'charge_automatically'
  };

  if (!trialDaysAvailed || ((/\d+Day/gi.test(couponCode)) && subscriptionType !== 'Lite' && subscriptionPlan !== 'yearly') || usedTrialDays < 7) {
    let days = 7;
    if (usedTrialDays < 7) {
      days = days - usedTrialDays;
    }
    if(couponCode && (/\d+Day/gi.test(couponCode)) && subscriptionType !== 'Lite' && subscriptionPlan !== 'yearly') {
      days = parseFloat(couponCode);
    }
    extend(body, { trial_period_days: days });
  }
  if (discountCoupon && couponCode) { 
    extend(body, { coupon: discountCoupon?.id });
  } 

  const response = await stripe.subscriptions.create(body);

  return response;
};

export default CreateSubscription;
