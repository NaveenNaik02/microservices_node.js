import { CartRepository } from "../repository/cart.repository";

export interface ICartService {
  createCart: (input: any) => void;
}
