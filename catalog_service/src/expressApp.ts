import express from "express";
import catalogRouter from "./api/catalog.routes";
import {
  container,
  HandleErrorWithLogger,
  httpLogger,
  logger,
  STATUS_CODES,
  TYPES,
} from "./utils";
import { IBrokerService } from "./interface";

const brokerService = container.get<IBrokerService>(TYPES.BrokerService);

const app = express();
app.use(express.json());
app.use(httpLogger);

brokerService
  .initializeBroker()
  .then(() => logger.info("Broker service initialized"))
  .catch((err) => logger.error("Broker initialization failed", err));

app.use("/", catalogRouter);

app.use("/", (_req, res, _next) => {
  res.status(STATUS_CODES.OK).json({ message: "I am healthy" });
});

app.use(HandleErrorWithLogger);

export default app;
