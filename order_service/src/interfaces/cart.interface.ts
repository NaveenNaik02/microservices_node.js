// import { CartLineItem } from "../db/schema";
import { CartWithLineItems, CartLineItem } from "../dto";
import { CartRepository } from "../repository/cart.repository";

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
