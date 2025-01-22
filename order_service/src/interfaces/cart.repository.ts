import { CartLineItem } from "../db/schema";

export interface ICartRepository {
  createCart(customerId: number, lineItem: CartLineItem): Promise<number>;
}
