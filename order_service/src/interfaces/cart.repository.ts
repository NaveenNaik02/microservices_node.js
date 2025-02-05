import { CartLineItem } from "../db/schema";
import { CartWithLineItems } from "../dto";

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
  findCart(customerId: number): Promise<CartWithLineItems>;
  deleteCart(lineItemId: number): Promise<boolean>;
}
