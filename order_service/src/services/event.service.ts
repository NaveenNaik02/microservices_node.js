import { injectable } from "inversify";
import { IEventService } from "../interfaces";
import { MessageType } from "../types";
import { logger } from "../utils";

@injectable()
export class EventService implements IEventService {
  handleSubScription(message: MessageType): void {
    logger.info("Message received by order Kafka consumer", message);
  }
}
