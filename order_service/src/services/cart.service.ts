import { ICartService } from "../interfaces";
import { CartRepository } from "../repository/cart.repository";

export class CartService implements ICartService {
  private repo: CartRepository;
  constructor(repo: CartRepository) {
    this.repo = repo;
  }
  createCart: (input: any) => {};
}
