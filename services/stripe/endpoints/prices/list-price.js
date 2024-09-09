import { extend } from 'lodash';

const ListPrice = async ({
  stripe,
  productId
}) => {
  const response = await stripe.prices.list({
    product: productId,
    active: true
  });

  return response;
};

export default ListPrice;
