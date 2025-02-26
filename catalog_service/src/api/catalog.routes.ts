import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  editProductController,
  getProductController,
  getProductsController,
  getProductStockController,
} from "../controller/catalog.controller";

const router = Router();

router.post("/products", createProductController);
router.patch("/products/:id", editProductController);
router.get("/products", getProductsController);
router.get("/products/:id", getProductController);
router.delete("/products/:id", deleteProductController);
router.get("/products/stock", getProductStockController);

export default router;
