import { Container } from "inversify";
import {
  IBrokerService,
  ICatalogRepository,
  ICatalogService,
  IMessageBroker,
} from "../interface";
import { TYPES } from "./constants";
import { CatalogRepository } from "../repository/catalog.repository";
import { CatalogService } from "../services/catalog.service";
import { MessageBroker } from "./broker";
import { BrokerService } from "../services";

export const container = new Container();

container
  .bind<ICatalogRepository>(TYPES.ProductRepository)
  .to(CatalogRepository);
container.bind<ICatalogService>(TYPES.CatalogService).to(CatalogService);
container.bind<IMessageBroker>(TYPES.MessageBroker).to(MessageBroker);
container.bind<IBrokerService>(TYPES.BrokerService).to(BrokerService);
