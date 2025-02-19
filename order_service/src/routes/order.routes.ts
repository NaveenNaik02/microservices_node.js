import { Router } from "express";
import { RequestAuthorizer } from "../middleware";
import {
  createOrderController,
  deleteOrderController,
  getOrderController,
  getOrdersController,
  updateOrderController,
} from "../controllers";

const router = Router();

router.post("/orders", RequestAuthorizer, createOrderController);
router.get("/orders", RequestAuthorizer, getOrdersController);
router.get("/orders/:id", RequestAuthorizer, getOrderController);
router.patch("/orders/:id", RequestAuthorizer, updateOrderController);
router.delete("/orders/:id", RequestAuthorizer, deleteOrderController);
