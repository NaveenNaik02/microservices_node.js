import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../interface";
import { RegisterUserType, UserType } from "../types";
import { ValidationError } from "../utils";

export class UserRepository implements IUserRepository {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async registerUser(input: RegisterUserType) {
    const user = await this._prisma.user.findFirst({
      where: {
        email: input.email,
      },
    });
    if (user) {
      throw new ValidationError("Email already exists");
    }

    const newUser = await this._prisma.user.create({
      data: input,
    });

    const { password, ...safeUser } = newUser;
    return safeUser;
  }

  async getUser(email: string) {
    const user = await this._prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }
}
