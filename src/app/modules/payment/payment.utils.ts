const SSLCommerzPayment = require("sslcommerz-lts");
import dotenv from "dotenv";

// config
dotenv.config();
const store_id = process.env.SSL_COMMERZ_STORE_ID;
const store_passwd = process.env.SSL_COMMERZ_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

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
      success_url: `https://server-lyart-chi.vercel.app/api/v1/payment/success/${transactionId}`,
      fail_url: `https://server-lyart-chi.vercel.app/api/v1/payment/failed/${transactionId}`,
      cancel_url: `https://server-lyart-chi.vercel.app/api/v1/payment/cancel/${transactionId}`,
      ipn_url: "https://server-lyart-chi.vercel.app/api/v1/payment/ipn",
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
    //   create ssl obj
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    return sslcz.init(data).then((apiResponse: any) => {
      // Redirect the user to payment gateway
      return apiResponse;
    });
  } catch (error) {
    throw new Error("payment initiate failed");
  }
};
//* verify payment utils ==========================================
export const verifyPayment = async (transactionId: string) => {
  const data = {
    val_id: transactionId, //that you go from sslcommerz response
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const response = sslcz.validate(data).then((data: any) => data);
  return response;
};
