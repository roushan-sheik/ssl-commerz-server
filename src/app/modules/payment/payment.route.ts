import express from "express";
import { ipnController } from "./ipn.controller";
import {
  confirmationCancel,
  confirmationController,
  confirmationFailed,
} from "./payment.controller";

const router = express.Router();
router.route("/success/:tranId").post(confirmationController);
router.route("/failed/:tranId").post(confirmationFailed);
router.route("/cancel/:tranId").post(confirmationCancel);
router.route("/ipn").post(ipnController);

export default router;
