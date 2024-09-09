import { extend } from 'lodash';

const CreateCustomer = async ({
  stripe,
  name,
  email,
  token,
  metaData,
  description,
  address
}) => {
  const stripeBody = {};

  if (name) {
    extend(stripeBody, { name });
  }

  if (email) {
    extend(stripeBody, { email });
  }

  if (token) {
    extend(stripeBody, { source: token.id });
  }

  if (metaData) {
    extend(stripeBody, { metaData });
  }

  if (description) {
    extend(stripeBody, { description });
  }

  if (address) {
    extend(stripeBody, { address });
  }

  let response;
  try {
    const customers = await stripe.customers.list({ email });
    const { data } = customers || {}
    if (data?.length) {
      const { id } = data[0] || {}
      response = await stripe.customers.update(id, stripeBody);
    } else {
      response = await stripe.customers.create(stripeBody);
    }
  } catch (e) {}

  return response;
};

export default CreateCustomer;
