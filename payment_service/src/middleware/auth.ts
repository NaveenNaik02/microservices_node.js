import { NextFunction, Request, Response } from "express";
import { AuthorizeError, ValidateUser } from "../utils";

export const RequestAuthorizer = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new AuthorizeError(
        "Unauthorized due to authorization token missing!"
      );
    }

    const userData = await ValidateUser(req.headers.authorization as string);
    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};
