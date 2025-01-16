import { Product } from "../models/product.model";

export interface ICatalogService {
  createProduct(input: any): Promise<Product>;
  updateProduct(input: any): Promise<Product>;
  getProducts(limit: number, offset: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product>;
  deleteProduct(id: number): Promise<Product>;
  getProductStock(ids: number[]): Promise<Product[]>;
}
