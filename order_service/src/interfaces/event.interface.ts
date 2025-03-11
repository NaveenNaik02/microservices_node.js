import { MessageType } from "../types";

export interface IEventService {
  handleSubScription(message: MessageType): void;
}
