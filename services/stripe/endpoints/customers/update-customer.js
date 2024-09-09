import { extend } from 'lodash';

const UpdateCustomer = async ({
  stripe,
  name,
  stripeUserId,
  token,
  metaData,
  address,
  email
}) => {
  const body = {};
  if (token) {
    extend(body, { source: token.id });
  }

  if (name) {
    extend(body, { name });
  }

  if (metaData) {
    extend(body, { metadata: metaData });
  }

  if (address) {
    extend(body, { address });
  }

  if (email) {
    extend(body, { email });
  }

  const response = await stripe.customers.update(stripeUserId, body);
  return response;
};

export default UpdateCustomer;
