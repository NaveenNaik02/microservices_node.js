import { Container } from "inversify";
import {
  ICartRepository,
  ICartService,
  IMessageBroker,
  IOrderRepository,
  IOrderService,
} from "../interfaces";
import { CartRepository, OrderRepository } from "../repository";
import { CartService, OrderService } from "../services";
import { TYPES } from "./constants";
import { MessageBroker } from "./broker/message-broker";

export const container = new Container();

container.bind<ICartRepository>(TYPES.CART_REPOSITORY).to(CartRepository);
container.bind<ICartService>(TYPES.CART_SERVICE).to(CartService);
container.bind<IOrderRepository>(TYPES.ORDER_REPOSITORY).to(OrderRepository);
container.bind<IOrderService>(TYPES.ORDER_SERVICE).to(OrderService);
container.bind<IMessageBroker>(TYPES.MESSAGE_BROKER).to(MessageBroker);
