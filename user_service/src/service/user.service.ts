import { inject, injectable } from "inversify";
import { IUserRepository, IUserService } from "../interface";
import { RegisterUserType } from "../types";
import { TYPES } from "../utils";

@injectable()
export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(@inject(TYPES.USER_REPOSITORY) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(input: RegisterUserType) {
    const user = await this.userRepository.registerUser(input);
    return user;
  }

  async getUser(email: string) {
    const user = await this.userRepository.getUser(email);
    return user;
  }
}
