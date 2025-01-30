import { CartLineItem } from "../db/schema";
import { ICartService } from "../interfaces";
import { CartRepository } from "../repository/cart.repository";
import { GetProductDetails } from "../utils/broker";
import { NotFoundError } from "../utils/error";

export class CartService implements ICartService {
  private repo: CartRepository;
  constructor(repo: CartRepository) {
    this.repo = repo;
  }

  async createCart(input: any): Promise<CartLineItem | null> {
    // get product from catalog service
    const product = await GetProductDetails(input.productId);
    if (product.stock < input.qty) {
      throw new NotFoundError("product is out of stock");
    }

    // if product is already in the cart
    const lineItem = await this.repo.findCartByProductId(2, product.id);
    if (lineItem.qty + input.qty > product.stock) {
      throw new NotFoundError("product is out of stock");
    }

    if (lineItem) {
      return this.repo.updateCart(lineItem.id, lineItem.qty + input.qty);
    }

    const result = await this.repo.createCart(input.id, {
      productId: product.id,
      price: product.price.toString(),
      qty: input.qty,
      itemName: product.name,
      variant: product.variant,
    });

    return result;
  }
}
