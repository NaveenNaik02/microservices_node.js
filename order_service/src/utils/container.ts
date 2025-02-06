import { Container } from "inversify";
import { ICartRepository, ICartService } from "../interfaces";
import { TYPES } from "./constants";
import { CartRepository } from "../repository/cart.repository";
import { CartService } from "../services/cart.service";

export const container = new Container();

container.bind<ICartRepository>(TYPES.CART_REPOSITORY).to(CartRepository);
container.bind<ICartService>(TYPES.CART_SERVICE).to(CartService);
