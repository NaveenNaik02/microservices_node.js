import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment.route";
import { httpLogger, STATUS_CODES } from "./utils";
import { HandleErrorWithLogger } from "./middleware";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(httpLogger);

app.use(paymentRoutes);

app.use("/", (_req, res) => {
  res.status(STATUS_CODES.OK).json({
    message: "I am healthy",
  });
});

app.use(HandleErrorWithLogger);

export default app;
