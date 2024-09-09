const GetUserInvoices = async ({
  stripe,
  stripeUserId
}) => {
  const invoices = await stripe.invoices.list({
    customer: stripeUserId,
    limit: 100
  });

  let upcomingInvoice;
  try {
    upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      customer: stripeUserId,
    });
  } catch(e) {

  }

  const result = invoices?.data;
  if (upcomingInvoice) {
    upcomingInvoice.status = 'Upcoming Invoice'
    result.unshift(upcomingInvoice)
  }

  if (result?.length) {
    const mapedResults = result.map(invoice => {
      const {
        number,
        total,
        created,
        status,
        customer_email
      } = invoice;
      return {
        number,
        total: total/100,
        created,
        status,
        customer_email
      }
    });
    return mapedResults?.filter(invoice => invoice.total) || []
  }
};

export default GetUserInvoices;
