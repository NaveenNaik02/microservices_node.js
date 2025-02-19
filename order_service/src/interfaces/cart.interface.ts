import { CartLineItem as LineItem, CartLineItemInput } from "../db/schema";
import { CartWithLineItems, CartLineItem } from "../dto";
export interface ICartService {
  createCart: (input: any) => Promise<CartLineItem | null>;
  getCart: (userId: number) => Promise<CartWithLineItems>;
  editCart: (
    lineItemId: number,
    customerId: number,
    qty: number
  ) => Promise<CartLineItem>;
  deleteCart(lineItemId: number, customerId: number): Promise<boolean>;
}

export interface ICartRepository {
  createCart(
    customerId: number,
    lineItem: CartLineItemInput
  ): Promise<LineItem | null>;
  findCartByProductId(customerId: number, productId: number): Promise<LineItem>;
  updateCart(lineItemId: number, qty: number): Promise<LineItem>;
  findCart(customerId: number): Promise<CartWithLineItems>;
  deleteCart(lineItemId: number): Promise<boolean>;
  clearCartData(userId: number): Promise<boolean>;
}
