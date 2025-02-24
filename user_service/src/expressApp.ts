import express from "express";
import AuthRouter from "./routes/auth.routes";
import { HandleErrorWithLogger, STATUS_CODES } from "./utils";

const app = express();
app.use(express.json());

app.use("/auth", AuthRouter);

app.use("/", (_req, res) => {
  res.status(STATUS_CODES.OK).json({ message: "I am healthy" });
});

app.use(HandleErrorWithLogger);

export default app;
