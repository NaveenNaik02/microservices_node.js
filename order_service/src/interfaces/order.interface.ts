import { InProcessOrder, OrderWithLineItems } from "../dto/orderRequest.dto";
import { MessageType, OrderStatus } from "../types";

export interface IOrderRepository {
  createOrder(lineItem: OrderWithLineItems): Promise<number>;
  findOrder(id: number): Promise<OrderWithLineItems | null>;
  updateOrder(id: number, status: string): Promise<OrderWithLineItems>;
  deleteOrder(id: number): Promise<boolean>;
  findOrderByCustomerId(customerId: number): Promise<OrderWithLineItems[]>;
}

export interface IOrderService {
  createOrder(
    userId: number
  ): Promise<{ message: string; orderNumber: number }>;
  updateOrder(
    orderId: number,
    status: OrderStatus
  ): Promise<{ message: string }>;
  getOrder(userId: number): Promise<OrderWithLineItems | null>;
  getOrders(userId: number): Promise<OrderWithLineItems[]>;
  deleteOrder(orderId: number): Promise<boolean>;
  findOrder(orderId: number): Promise<InProcessOrder>;
}
