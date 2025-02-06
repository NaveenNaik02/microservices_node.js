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
