import User from '../../models/user';

import STRIPEAPI from '../../services/stripe';

const CreateCustomer = async ({
  userId,
  token,
  email,
  name,
  address,
  description
}) => {
  const res = await STRIPEAPI({
    endpoint: 'CreateCustomer',
    params: {
      token,
      email,
      name,
      address,
      description
    }
  });

  const {
    address: {
      line1,
      country
    }
  } = res;

  await User.updateOne({
    _id: userId
  }, {
    $set: {
      'payment.stripeUserId': res.id,
      'payment.paymentCardUpdatedAt': new Date(),
      'payment.name': name,
      'payment.cardLast4Digits': token?.card?.last4,
      'payment.cardExpMonth': token?.card?.exp_month,
      'payment.cardExpYear': token?.card?.exp_year,
      'payment.address': { line1, country }
    }
  });

  return res;
};

export default CreateCustomer;
