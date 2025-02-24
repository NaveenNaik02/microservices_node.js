import { RegisterUserRequest } from "../dto/user.dto";
import { User } from "@prisma/client";

export type RegisterUserType = Omit<RegisterUserRequest, keyof object>;
export type UserType = Omit<User, "password">;
export type UserWithPasswordType = User;
