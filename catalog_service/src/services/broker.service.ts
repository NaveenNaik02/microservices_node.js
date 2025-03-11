import { inject, injectable } from "inversify";
import { IBrokerService, ICatalogService, IMessageBroker } from "../interface";
import { Consumer, Producer } from "kafkajs";
import { logger, TYPES } from "../utils";

@injectable()
export class BrokerService implements IBrokerService {
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private catalogService: ICatalogService;
  private messageBroker: IMessageBroker;

  constructor(
    @inject(TYPES.CatalogService) catalogService: ICatalogService,
    @inject(TYPES.MessageBroker) messageBroker: IMessageBroker
  ) {
    this.catalogService = catalogService;
    this.messageBroker = messageBroker;
  }

  async initializeBroker(): Promise<void> {
    this.producer = await this.messageBroker.connectProducer<Producer>();
    this.producer.on("producer.connect", async () => {
      logger.info("catalog service producer connected successfully");
    });

    this.consumer = await this.messageBroker.connectConsumer<Consumer>();
    this.consumer.on("consumer.connect", async () => {
      logger.info("catalog service consumer connected successfully");
    });

    await this.messageBroker.subscribe(
      this.catalogService.handleBrokerMessage.bind(this.catalogService),
      "CatalogEvents"
    );
  }
}
