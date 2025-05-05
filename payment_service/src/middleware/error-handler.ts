import { NextFunction, Request, Response } from "express";
import {
  AuthorizeError,
  logger,
  NotFoundError,
  STATUS_CODES,
  ValidationError,
} from "../utils";

export const HandleErrorWithLogger = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let reportError = true;
  let status = STATUS_CODES.INTERNAL_ERROR;
  let data = error.message;

  [NotFoundError, ValidationError, AuthorizeError].forEach((type) => {
    if (error instanceof type) {
      reportError = false;
      status = error.status;
      data = error.message;
    }
  });

  if (reportError) {
    logger.error(error);
  } else {
    logger.warn(error);
  }
  res.status(status).json(data);
};

export const HandleUnCaughtException = async (error: Error) => {
  logger.error(error);
  process.exit(1);
};
