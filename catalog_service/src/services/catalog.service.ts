import { inject, injectable } from "inversify";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { TYPES } from "../utils";

@injectable()
export class CatalogService {
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
}
