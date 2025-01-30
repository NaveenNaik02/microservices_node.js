import express from "express";
import catalogRouter from "./api/catalog.routes";
import { HandleErrorWithLogger, httpLogger, STATUS_CODES } from "./utils";

const app = express();
app.use(express.json());
app.use(httpLogger);

app.use("/", catalogRouter);

app.use("/", (_req, res, _next) => {
  res.status(STATUS_CODES.OK).json({ message: "I am healthy" });
});

app.use(HandleErrorWithLogger);

export default app;
