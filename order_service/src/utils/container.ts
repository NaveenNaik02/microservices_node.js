import { Container } from "inversify";
import {
  BrokerService,
  CartService,
  EventService,
  OrderService,
} from "../services";
import { CartRepository, OrderRepository } from "../repository";
import { MessageBroker } from "./broker/message-broker";
import {
  IBrokerService,
  ICartRepository,
  ICartService,
  IEventService,
  IMessageBroker,
  IOrderRepository,
  IOrderService,
} from "../interfaces";
import { TYPES } from "./constants";

export const container = new Container();

container.bind<ICartRepository>(TYPES.CART_REPOSITORY).to(CartRepository);
container.bind<ICartService>(TYPES.CART_SERVICE).to(CartService);
container.bind<IOrderRepository>(TYPES.ORDER_REPOSITORY).to(OrderRepository);
container.bind<IOrderService>(TYPES.ORDER_SERVICE).to(OrderService);
container.bind<IMessageBroker>(TYPES.MESSAGE_BROKER).to(MessageBroker);
container.bind<IBrokerService>(TYPES.BROKER_SERVICE).to(BrokerService);
container.bind<IEventService>(TYPES.EVENT_SERVICE).to(EventService);
