import { NextFunction, Request, Response } from "express";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";

export const HandleErrorWithLogger = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let reportError = true;
  let status = 500;
  let data = error.message;

  [NotFoundError, ValidationError, AuthorizeError].forEach((typeError) => {
    if (error instanceof typeError) {
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
