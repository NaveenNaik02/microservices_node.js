import { Router } from "express";
import {
  createPaymentController,
  verifyPaymentController,
} from "../controller/payment.controller";
import { RequestAuthorizer } from "../middleware";

const route = Router();

route.post("/create-payment", RequestAuthorizer, createPaymentController);
route.get("/verify-payment/:id", RequestAuthorizer, verifyPaymentController);

export default route;
