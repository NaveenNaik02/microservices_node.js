import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  AuthorizeError,
  generateToken,
  NotFoundError,
  RequestValidator,
  STATUS_CODES,
  ValidationError,
} from "../utils";
import { LoginUserRequest, RegisterUserRequest } from "../dto/user.dto";
import { UserService } from "../service/user.service";

const userService = new UserService();
const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { errors, input } = await RequestValidator(
      RegisterUserRequest,
      req.body
    );
    if (typeof errors === "string") {
      throw new ValidationError(errors);
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const data = await userService.registerUser({
      ...input,
      password: hashedPassword,
    });
    res.status(STATUS_CODES.CREATED).json(data);
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { errors, input } = await RequestValidator(
      LoginUserRequest,
      req.body
    );

    if (typeof errors === "string") {
      throw new ValidationError(errors);
    }

    const user = await userService.getUser(input.email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new ValidationError("Invalid password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.status(STATUS_CODES.OK).json({ token: token });
  } catch (error) {
    next(error);
  }
};

const userSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthorizeError("Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(STATUS_CODES.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export { registerUserController, loginUserController, userSessionController };
