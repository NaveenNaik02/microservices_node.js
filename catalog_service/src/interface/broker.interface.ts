import { MessageHandler, PublishType, TOPIC_TYPE } from "../types";

export interface IBrokerService {
  initializeBroker(): Promise<void>;
}

export interface IMessageBroker {
  // producer
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: () => Promise<void>;
  publish: (data: PublishType) => Promise<boolean>;

  // consumer
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: () => Promise<void>;
  subscribe: (
    messageHandler: MessageHandler,
    topic: TOPIC_TYPE
  ) => Promise<void>;
}
