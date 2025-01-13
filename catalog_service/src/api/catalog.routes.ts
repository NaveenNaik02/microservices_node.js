import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  editProductHandler,
  getProductHandler,
  getProductsHandler,
  getProductStockHandler,
} from "../requestHandler";

const router = Router();

router.post("/products", createProductHandler);
router.patch("/products/:id", editProductHandler);
router.get("/products", getProductsHandler);
router.get("/products/:id", getProductHandler);
router.delete("/products/:id", deleteProductHandler);
router.get("/products/stock", getProductStockHandler);

export default router;
