import { IUserService } from "../interface";
import { UserRepository } from "../repository/user.repository";
import { RegisterUserType } from "../types";

const userRepository = new UserRepository();

export class UserService implements IUserService {
  async registerUser(input: RegisterUserType) {
    const user = await userRepository.registerUser(input);
    return user;
  }

  async getUser(email: string) {
    const user = await userRepository.getUser(email);
    return user;
  }
}
