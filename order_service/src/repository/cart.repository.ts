import { DB } from "../db/db.connection";
import { CartLineItem, cartLineItems, carts } from "../db/schema";
import { ICartRepository } from "../interfaces";

export class CartRepository implements ICartRepository {
  async createCart(
    customerId: number,
    { itemName, price, productId, qty, variant }: CartLineItem
  ) {
    const result = await DB.insert(carts)
      .values({ customerId })
      .returning()
      .onConflictDoUpdate({
        target: carts.customerId,
        set: { updatedAt: new Date() },
      });
    const [{ id }] = result;

    if (id > 0) {
      await DB.insert(cartLineItems).values({
        cartId: id,
        productId,
        itemName,
        price,
        qty,
        variant,
      });
    }
    return id;
  }
}
