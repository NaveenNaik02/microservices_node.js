import { inject, injectable } from "inversify";
import {
  ICatalogRepository,
  ICatalogService,
} from "../interface/catalog.interface";
import { logger, TYPES } from "../utils";
import { OrderWithLineItems } from "../types/message.type";

@injectable()
export class CatalogService implements ICatalogService {
  private _repository: ICatalogRepository;

  constructor(@inject(TYPES.ProductRepository) repository: ICatalogRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
    if (!data) {
      throw new Error("unable to create product");
    }
    return data;
  }

  async updateProduct(input: any) {
    const data = await this._repository.update(input);
    if (!data.id) {
      throw new Error("unable to update product");
    }
    return data;
  }

  async getProducts(limit: number, offset: number) {
    const products = await this._repository.find(limit, offset);
    return products;
  }

  async getProduct(id: number) {
    const product = await this._repository.findOne(id);
    return product;
  }

  async deleteProduct(id: number) {
    const response = await this._repository.delete(id);
    return response;
  }

  async getProductStock(ids: number[]) {
    const products = await this._repository.findStock(ids);
    if (!products) {
      throw new Error("unable to find product stocks details");
    }
    return products;
  }

  async handleBrokerMessage(message: any) {
    logger.info("catalog service received the message", message);
    const { orderItems = [] } = message.data as OrderWithLineItems;
    orderItems.forEach(async (item) => {
      const product = await this.getProduct(item.productId);
      if (!product) {
        logger.error("product not found during stock update for create order");
        return;
      }

      const updateStock = product.stock - item.qty;
      await this.updateProduct({ ...product, stock: updateStock });
    });
  }
}
