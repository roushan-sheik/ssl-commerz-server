import { RequestHandler } from "express";
import {
  confirmationCancelService,
  confirmationFailedService,
  confirmationService,
} from "./payment.service";

const confirmationController: RequestHandler = async (req, res) => {
  try {
    const { tranId } = req.params;
    //   update order payment status
    await confirmationService(tranId);
    res.redirect(`http://localhost:5173/payment/confirmation/${tranId}`);
  } catch (error) {
    console.log(error);
  }
};
const confirmationFailed: RequestHandler = async (req, res) => {
  try {
    const { tranId } = req.params;
    //   update order payment status
      await confirmationFailedService(tranId);
            console.log("confirmationFailed>: ", tranId);
    res.redirect(`http://localhost:5173/payment/failed}`);
  } catch (error) {
    console.log(error);
  }
};
const confirmationCancel: RequestHandler = async (req, res) => {
  try {
      const { tranId } = req.params;
      console.log("confirmationCancel: " ,tranId);
    //   update order payment status
    await confirmationCancelService(tranId);
    res.redirect(`http://localhost:5173/payment/cancel`);
  } catch (error) {
    console.log(error);
  }
};

export { confirmationCancel, confirmationController, confirmationFailed };
