import { RegisterUserType, UserType, UserWithPasswordType } from "../types";

export interface IUserService {
  registerUser(input: RegisterUserType): Promise<UserType>;
  getUser(email: string): Promise<UserWithPasswordType | null>;
}

export interface IUserRepository {
  registerUser(input: RegisterUserType): Promise<UserType>;
  getUser(email: string): Promise<UserWithPasswordType | null>;
}
