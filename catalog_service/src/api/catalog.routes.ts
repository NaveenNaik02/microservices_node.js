import { Router } from "express";
import { createProductHandler } from "../requestHandler";

const router = Router();

router.post("/products", createProductHandler);

export default router;
