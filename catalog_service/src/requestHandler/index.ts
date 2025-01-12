import { RequestHandler } from "express";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest } from "../dto/product.dto";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";

export const catalogService = new CatalogService(new CatalogRepository());

export const createProductHandler: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const { errors, input } = await RequestValidator(
      CreateProductRequest,
      req.body
    );

    if (errors) {
      res.status(400).json(errors);
      return;
    }
    const data = await catalogService.createProduct(input);
    res.status(201).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).json(err.message);
  }
};
