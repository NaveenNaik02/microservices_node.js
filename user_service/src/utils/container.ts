import { Container } from "inversify";
import { IUserRepository, IUserService } from "../interface";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";
import { TYPES } from "./constants";

export const container = new Container();

container.bind<IUserRepository>(TYPES.USER_REPOSITORY).to(UserRepository);
container.bind<IUserService>(TYPES.USER_SERVICE).to(UserService);
