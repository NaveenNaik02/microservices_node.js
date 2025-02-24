import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  userSessionController,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/validate", userSessionController);

export default router;
