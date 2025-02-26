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

    const user = await ValidateUser(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
