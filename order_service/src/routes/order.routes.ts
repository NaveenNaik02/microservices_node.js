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

router.post("/", RequestAuthorizer, createOrderController);
router.get("/", RequestAuthorizer, getOrdersController);
router.get("/:id", RequestAuthorizer, getOrderController);
router.patch("/:id", RequestAuthorizer, updateOrderController);
router.delete("/:id", RequestAuthorizer, deleteOrderController);
router.get("/:id/checkout");

export default router;
