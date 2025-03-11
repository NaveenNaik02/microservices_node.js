import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: any): Promise<Product>;
  find(limit: number, offset: number): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
  findStock(ids: number[]): Promise<Product[]>;
}

export interface ICatalogService {
  createProduct(input: any): Promise<Product>;
  updateProduct(input: any): Promise<Product>;
  getProducts(limit: number, offset: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product>;
  deleteProduct(id: number): Promise<Product>;
  getProductStock(ids: number[]): Promise<Product[]>;
  handleBrokerMessage(message: any): Promise<void>;
}
