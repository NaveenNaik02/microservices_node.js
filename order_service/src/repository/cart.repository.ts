import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { CartLineItem, cartLineItems, carts } from "../db/schema";
import { ICartRepository } from "../interfaces";
import { NotFoundError } from "../utils/error";
import { CartWithLineItems } from "../dto";

export interface CreateCartInput {
  itemName: string;
  productId: number;
  price: string;
  qty: number;
  variant: string | null;
}
export class CartRepository implements ICartRepository {
  async createCart(
    customerId: number,
    { itemName, price, productId, qty, variant }: CreateCartInput
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
      const [lineItem] = await DB.insert(cartLineItems)
        .values({
          cartId: id,
          productId,
          itemName,
          price,
          qty,
          variant,
        })
        .returning();
      return lineItem;
    }
    return null;
  }

  async findCartByProductId(
    customerId: number,
    productId: number
  ): Promise<CartLineItem> {
    const cart = await DB.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.customerId, customerId),
      with: {
        lineItems: true,
      },
    });

    const lineItem = cart?.lineItems.find(
      (item) => item.productId === productId
    );
    return lineItem as CartLineItem;
  }

  async updateCart(lineItemId: number, qty: number): Promise<CartLineItem> {
    const [cartLineItem] = await DB.update(cartLineItems)
      .set({
        qty: qty,
      })
      .where(eq(cartLineItems.id, lineItemId))
      .returning();
    return cartLineItem;
  }

  async findCart(id: number): Promise<CartWithLineItems> {
    const cartInfo = await DB.query.carts.findFirst({
      where: (cart, { eq }) => eq(cart.customerId, id),
      with: {
        lineItems: true,
      },
    });

    if (!cartInfo) {
      throw new NotFoundError("cart not found");
    }
    return cartInfo;
  }

  async deleteCart(lineItemId: number) {
    await DB.delete(cartLineItems)
      .where(eq(cartLineItems.id, lineItemId))
      .returning();
    return true;
  }
}
