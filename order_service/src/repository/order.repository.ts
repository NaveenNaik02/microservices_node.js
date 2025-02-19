import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { orderLineItems, orders } from "../db/schema/order";
import { OrderWithLineItems } from "../dto/orderRequest.dto";
import { IOrderRepository } from "../interfaces/order.interface";
import { NotFoundError } from "../utils";

export class OrderRepository implements IOrderRepository {
  async createOrder(lineItem: OrderWithLineItems): Promise<number> {
    const result = await DB.insert(orders)
      .values({
        customerId: lineItem.customerId,
        orderNumber: lineItem.orderNumber,
        status: lineItem.status,
        txnId: lineItem.txnId,
        amount: lineItem.amount,
      })
      .returning();

    const [{ id }] = result;

    if (id > 0) {
      for (const item of lineItem.orderItems) {
        await DB.insert(orderLineItems)
          .values({
            orderId: id,
            itemName: item.itemName,
            price: parseInt(item.price, 10),
            qty: item.qty,
          })
          .execute();
      }
    }

    return id;
  }

  async updateOrder(id: number, status: string): Promise<OrderWithLineItems> {
    await DB.update(orders)
      .set({
        status: status,
      })
      .where(eq(orders.id, id))
      .execute();

    const order = await this.findOrder(id);
    if (!order) {
      throw new NotFoundError("order not found");
    }
    return order;
  }

  async findOrder(id: number): Promise<OrderWithLineItems | null> {
    const order = await DB.query.orders.findFirst({
      where: (order, { eq }) => eq(order.id, id),
      with: {
        lineItems: true,
      },
    });

    if (!order) {
      throw new NotFoundError("order not found");
    }

    return order as unknown as OrderWithLineItems;
  }

  async deleteOrder(id: number): Promise<boolean> {
    await DB.delete(orders).where(eq(orders.id, id)).execute();
    return true;
  }

  async findOrderByCustomerId(
    customerId: number
  ): Promise<OrderWithLineItems[]> {
    const orders = await DB.query.orders.findMany({
      where: (order, { eq }) => eq(order.customerId, customerId),
      with: {
        lineItems: true,
      },
    });
    return orders as unknown as OrderWithLineItems[];
  }
}
