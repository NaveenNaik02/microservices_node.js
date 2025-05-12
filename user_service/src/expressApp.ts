import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth.routes";
import { HandleErrorWithLogger, STATUS_CODES } from "./utils";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/auth", AuthRouter);

app.use("/", (_req, res) => {
  res.status(STATUS_CODES.OK).json({ message: "I am healthy" });
});

app.use(HandleErrorWithLogger);

export default app;
