import express from "express";
import { confirmationCancel, confirmationController, confirmationFailed } from "./payment.controller";

const router = express.Router();
router.route("/success/:tranId").post(confirmationController);
router.route("/failed/:tranId").post(confirmationFailed);
router.route("/cancel/:tranId").post(confirmationCancel);

export default router;
