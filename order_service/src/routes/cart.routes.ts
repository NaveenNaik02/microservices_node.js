import { Router } from "express";
import { RequestAuthorizer } from "../middleware";

import {
  createCartController,
  deleteCartController,
  editCartController,
  getCartController,
} from "../controllers";

const router = Router();

router.post("/", RequestAuthorizer, createCartController);
router.get("/", RequestAuthorizer, getCartController);
router.patch("/:lineItemId", RequestAuthorizer, editCartController);
router.delete("/:lineItemId", RequestAuthorizer, deleteCartController);

export default router;
