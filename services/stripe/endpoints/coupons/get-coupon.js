const GetStripeCoupon = async ({
  stripe,
  coupon: code,
}) => {
  let stripeCoupon;
  try {
    stripeCoupon = await stripe.coupons.retrieve(code);
  } catch (e) {
    const promotionCodes = await stripe.promotionCodes.list({
      code
    });

    stripeCoupon = promotionCodes?.data[0];
    if (stripeCoupon && !stripeCoupon?.active) {
      throw 'This promotion code has been expired.'
    } else {
      stripeCoupon = promotionCodes?.data[0]?.coupon;
    }
    
    if (!stripeCoupon) {
      throw 'No such coupon found.'
    }
  }

  return stripeCoupon;
};

export default GetStripeCoupon;
