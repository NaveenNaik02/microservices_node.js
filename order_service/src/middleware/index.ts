import { NextFunction, Request, Response } from "express";
import { logger, STATUS_CODES } from "../utils";

export interface AuthenticatedRequest extends Request {
  user?: string;
}

export const RequestAuthorizer = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // if(!req.headers.authorization){
    //     return res.status(STATUS_CODES.UN_AUTHORIZED).json({error:"Unauthorized due to authorization missing!"})
    // }

    const userData = "john";
    req.id = 2;
    next();
  } catch (error) {
    logger.error(error);
    res.status(STATUS_CODES.UN_AUTHORIZED).json({ error });
  }
};
