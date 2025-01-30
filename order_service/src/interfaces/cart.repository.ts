import { CartLineItem } from "../db/schema";

export interface ICartRepository {
  createCart(
    customerId: number,
    lineItem: CartLineItem
  ): Promise<CartLineItem | null>;
  findCartByProductId(
    customerId: number,
    productId: number
  ): Promise<CartLineItem>;
  updateCart(lineItemId: number, qty: number): Promise<CartLineItem>;
}
