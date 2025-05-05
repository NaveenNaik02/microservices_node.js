import express from "express";
import cors from "cors";
import { container, logger, STATUS_CODES, TYPES } from "./utils";
import cartRouter from "./routes/cart.routes";
import orderRouter from "./routes/order.routes";
import { HandleErrorWithLogger } from "./utils/error";
import { IBrokerService } from "./interfaces";

const brokerService = container.get<IBrokerService>(TYPES.BROKER_SERVICE);

const app = express();
app.use(cors());
app.use(express.json());

brokerService
  .initializeBroker()
  .then(() => logger.info("Broker service initialized"))
  .catch((err) => logger.error("Broker initialization failed", err));

app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

app.use("/", (_req, res, _next) => {
  res.status(STATUS_CODES.OK).json({ message: "I am healthy" });
});

app.use(HandleErrorWithLogger);

export default app;
