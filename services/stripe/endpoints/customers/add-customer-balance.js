const AddCustomerBalance = async ({
    stripe,
    balance = 0,
    stripeUserId
  }) => {
    const response = await stripe.customers.createBalanceTransaction(
      stripeUserId,
      {
        amount: -(balance * 100), // giving negetive balance means credit balance or discount in next invoice
        currency: 'usd',
      }
    );
  
    return response;
  };
  
  export default AddCustomerBalance;
  