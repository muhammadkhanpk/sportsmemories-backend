const GetStripeCustomer = async ({
    stripe,
    stripeUserId
  }) => {
    const customer = await stripe.customers.retrieve(stripeUserId);
    return customer;
  };
  
  export default GetStripeCustomer;
  