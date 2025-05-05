import { inject, injectable } from "inversify";
import {
  IBrokerService,
  ICartRepository,
  IOrderRepository,
  IOrderService,
} from "../interfaces";
import { NotFoundError, TYPES } from "../utils";
import { InProcessOrder, OrderLineItemType, OrderWithLineItems } from "../dto";
import { OrderStatus } from "../types";

@injectable()
export class OrderService implements IOrderService {
  private cartRepository: ICartRepository;
  private orderRepository: IOrderRepository;
  private brokerService: IBrokerService;

  constructor(
    @inject(TYPES.CART_REPOSITORY) cartRepository: ICartRepository,
    @inject(TYPES.ORDER_REPOSITORY) orderRepository: IOrderRepository,
    @inject(TYPES.BROKER_SERVICE) brokerService: IBrokerService
  ) {
    this.cartRepository = cartRepository;
    this.orderRepository = orderRepository;
    this.brokerService = brokerService;
  }

  async createOrder(
    userId: number
  ): Promise<{ message: string; orderNumber: number }> {
    const cart = await this.cartRepository.findCart(userId);
    if (!cart) {
      throw new NotFoundError("cart not found");
    }

    // calculate total order amount
    let cartTotal = 0;
    let orderLineItems: OrderLineItemType[] = [];

    // create orderLine items from cart items
    cart.lineItems.forEach((item) => {
      cartTotal += item.qty * Number(item.price);
      orderLineItems.push({
        productId: item.productId,
        itemName: item.itemName,
        qty: item.qty,
        price: item.price,
      } as OrderLineItemType);
    });

    const orderNumber = Math.floor(Math.random() * 1000000);
    const orderInput: OrderWithLineItems = {
      orderNumber: orderNumber,
      txnId: null,
      status: OrderStatus.PENDING,
      customerId: userId,
      amount: cartTotal.toString(),
      orderItems: orderLineItems,
    };

    await this.orderRepository.createOrder(orderInput);
    await this.cartRepository.clearCartData(userId);
    await this.brokerService.sendCreateOrderMessage(orderInput);

    return { message: "Order created successfully", orderNumber: orderNumber };
  }

  async updateOrder(
    orderId: number,
    status: OrderStatus
  ): Promise<{ message: string }> {
    await this.orderRepository.updateOrder(orderId, status);
    return { message: "Order updated successfully" };
  }

  async getOrder(orderId: number): Promise<OrderWithLineItems | null> {
    const order = this.orderRepository.findOrder(orderId);
    if (!order) {
      throw new NotFoundError("order not found");
    }
    return order;
  }

  async getOrders(userId: number): Promise<OrderWithLineItems[]> {
    const orders = await this.orderRepository.findOrderByCustomerId(userId);
    if (!Array.isArray(orders)) {
      throw new NotFoundError("orders not found");
    }
    return orders;
  }

  async deleteOrder(orderId: any): Promise<boolean> {
    return await this.orderRepository.deleteOrder(orderId);
  }

  async findOrder(orderId: number): Promise<InProcessOrder> {
    const order = await this.orderRepository.findOrder(orderId);

    if (!order) {
      throw new NotFoundError("order not found");
    }

    const checkoutOrder: InProcessOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      customerId: order.customerId,
      amount: Number(order.amount),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    return checkoutOrder;
  }
}
