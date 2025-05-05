import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { logger } from "../logger";
import { IMessageBroker, MessageHandler, PublishType } from "../../interfaces";
import { MessageType, OrderEvent, TOPIC_TYPE } from "../../types";

const CLIENT_ID = process.env.CLIENT_ID || "order-service";
const GROUP_ID = process.env.GROUP_ID || "order-service-group";
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];

export class MessageBroker implements IMessageBroker {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: CLIENT_ID,
      brokers: BROKERS,
      logLevel: logLevel.INFO,
    });
  }

  private async createTopic(topic: string[]): Promise<void> {
    const topics = topic.map((t) => ({
      topic: t,
      numPartitions: 2,
      replicationFactor: 1,
    }));
    const admin = this.kafka.admin();
    await admin.connect();
    const topicExits = await admin.listTopics();
    for (const t of topics) {
      if (!topicExits.includes(t.topic)) {
        await admin.createTopics({
          topics: [t],
        });
      }
    }
    await admin.disconnect();
  }

  async connectProducer<T>(): Promise<T> {
    await this.createTopic(["OrderEvents"]);

    if (this.producer) {
      logger.info("producer already connected with existing connection");
      return this.producer as unknown as T;
    }

    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });

    await this.producer.connect();
    logger.info("producer connected with a new connection");
    return this.producer as unknown as T;
  }

  async disconnectProducer(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
    }
  }

  async publish(data: PublishType): Promise<boolean> {
    const producer = await this.connectProducer<Producer>();
    const result = await producer.send({
      topic: data.topic,
      messages: [
        {
          headers: data.headers,
          key: data.event,
          value: JSON.stringify(data.message),
        },
      ],
    });
    logger.info("published message", result);
    return result.length > 0;
  }

  async connectConsumer<T>(): Promise<T> {
    if (this.consumer) {
      return this.consumer as unknown as T;
    }

    this.consumer = this.kafka.consumer({
      groupId: GROUP_ID,
    });

    await this.consumer.connect();
    return this.consumer as unknown as T;
  }

  async disconnectConsumer(): Promise<void> {
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }

  async subscribe(
    messageHandler: MessageHandler,
    topic: TOPIC_TYPE
  ): Promise<void> {
    const consumer = await this.connectConsumer<Consumer>();
    await consumer.subscribe({ topic: topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic !== "OrderEvents") {
          return;
        }

        if (message.key && message.value) {
          const inputMessage: MessageType = {
            headers: message.headers,
            event: message.key.toString() as OrderEvent,
            data: message.value ? JSON.parse(message.value.toString()) : null,
          };
          messageHandler(inputMessage);
          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (Number(message.offset) + 1).toString(),
            },
          ]);
        }
      },
    });
  }
}

const publish = async (data: PublishType) => {};
