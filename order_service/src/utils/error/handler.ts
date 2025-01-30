import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../status-codes";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";

export const HandleErrorWithLogger = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let reportError = true;
  let status = STATUS_CODES.INTERNAL_ERROR;
  let data = error.message;

  //skip common / known errors
  const knownErrors = [NotFoundError, ValidationError, AuthorizeError];
  for (const typeOfError of knownErrors) {
    if (error instanceof typeOfError) {
      reportError = false;
      status = error.status;
      data = error.message;
      break;
    }
  }

  if (reportError) {
    // error reporting tools implementation eg: Cloudwatch,Sentry etc;
    logger.error(error);
  } else {
    logger.warn(error);
  }

  res.status(status).json(data);
};
