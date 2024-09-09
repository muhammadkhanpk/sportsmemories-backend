import User from '../../models/user';

import STRIPEAPI from '../../services/stripe';

const UpdateCustomer = async ({
  userId,
  token,
  stripeUserId,
  email = '',
  name = '',
  address = {}
}) => {
  const resOfUpdateCustomer = await STRIPEAPI({
    endpoint: 'UpdateCustomer',
    params: {
      token,
      stripeUserId,
      email,
      name,
      address
    }
  });

  const {
    address: {
      line1,
      country
    }
  } = resOfUpdateCustomer;

  await User.updateOne({
    _id: userId
  }, {
    $set: {
      'payment.stripeUserId': resOfUpdateCustomer.id,
      'payment.paymentCardUpdatedAt': new Date(),
      'payment.name': name,
      'payment.cardLast4Digits': token?.card?.last4,
      'payment.cardExpMonth': token?.card?.exp_month,
      'payment.cardExpYear': token?.card?.exp_year,
      'payment.address': { line1, country }
    }
  });
};

export default UpdateCustomer;
