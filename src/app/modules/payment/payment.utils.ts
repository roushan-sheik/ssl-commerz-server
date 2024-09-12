export const initiatePayment = async (paymentData: any) => {
  const {
    transactionId,
    totalPrice,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
  } = paymentData;
  try {
    const data = {
      total_amount: totalPrice,
      currency: "BDT",
      tran_id: transactionId, // use unique tran_id for each api call
      success_url: "http://localhost:3030/success",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: customerName,
      cus_email: customerEmail,
      cus_add1: customerAddress,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "9220",
      cus_country: "Bangladesh",
      cus_phone: customerPhone,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
  } catch (error) {
    throw new Error("payment initiate failed");
  }
};
