import orderModel from "../order/order.model";

const confirmationService = async (transactionId: string) => {
  await orderModel.findOneAndUpdate(
    { transactionId },
    {
      paymentStatus: "Paid",
    }
  );
};
const confirmationFailedService = async (transactionId: string) => {
  await orderModel.findOneAndDelete({ transactionId });
};

const confirmationCancelService = async (transactionId: string) => {
  await orderModel.findOneAndDelete({ transactionId });
};

export {
  confirmationCancelService,
  confirmationFailedService,
  confirmationService,
};
