import { inject, injectable } from "inversify";
import { IBrokerService, IMessageBroker, IOrderService } from "../interfaces";
import { logger, TYPES } from "../utils";
import { Consumer, Producer } from "kafkajs";
import { OrderEvent } from "../types";

@injectable()
export class BrokerService implements IBrokerService {
  messageBroker: IMessageBroker;
  orderService: IOrderService;
  constructor(
    @inject(TYPES.MESSAGE_BROKER) messageBroker: IMessageBroker,
    @inject(TYPES.ORDER_SERVICE) orderService: IOrderService
  ) {
    this.messageBroker = messageBroker;
    this.orderService = orderService;
  }
  async initializeBroker(): Promise<void> {
    const producer = await this.messageBroker.connectProducer<Producer>();
    producer.on("producer.connect", async () => {
      logger.info("Producer connected successfully");
    });

    const consumer = await this.messageBroker.connectConsumer<Consumer>();
    consumer.on("consumer.connect", async () => {
      logger.info("Consumer connected successfully");
    });

    await this.messageBroker.subscribe(
      this.orderService.handleSubScription,
      "OrderEvents"
    );
  }

  async sendCreateOrderMessage(data: any): Promise<void> {
    await this.messageBroker.publish({
      event: OrderEvent.CREATE_ORDER,
      topic: "CatalogEvents",
      headers: {},
      message: data,
    });
  }

  async sendOrderCanceledMessage(data: any): Promise<void> {
    await this.messageBroker.publish({
      event: OrderEvent.CANCEL_ORDER,
      topic: "CatalogEvents",
      headers: {},
      message: data,
    });
  }
}
