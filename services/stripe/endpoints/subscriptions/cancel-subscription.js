const CancelSubscription = async ({
  stripe,
  subscriptionId
}) => {
  const response = await stripe.subscriptions.del(subscriptionId);

  return response;
};

export default CancelSubscription;
