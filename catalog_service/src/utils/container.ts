import { Container } from "inversify";
import { ICatalogRepository, ICatalogService } from "../interface";
import { TYPES } from "./constants";
import { CatalogRepository } from "../repository/catalog.repository";
import { CatalogService } from "../services/catalog.service";

export const container = new Container();

container
  .bind<ICatalogRepository>(TYPES.ProductRepository)
  .to(CatalogRepository);
container.bind<ICatalogService>(TYPES.CatalogService).to(CatalogService);
