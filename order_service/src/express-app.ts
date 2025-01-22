import express from "express";
import cors from "cors";
import { STATUS_CODES } from "./utils";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/", (_req, res, _next) => {
    res.status(STATUS_CODES.OK).json({ message: "I am healthy" });
  });

  return app;
};
