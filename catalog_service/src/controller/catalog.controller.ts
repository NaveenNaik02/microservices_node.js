import { Request, Response, NextFunction } from "express";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import {
  container,
  RequestValidator,
  STATUS_CODES,
  TYPES,
  ValidationError,
} from "../utils";
import { ICatalogService } from "../interface";

const catalogService = container.get<ICatalogService>(TYPES.CatalogService);

const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { errors, input } = await RequestValidator(
      CreateProductRequest,
      req.body
    );

    if (typeof errors === "string") {
      throw new ValidationError(errors);
    }
    const data = await catalogService.createProduct(input);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const editProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { errors, input } = await RequestValidator(
      UpdateProductRequest,
      req.body
    );

    if (typeof errors === "string") {
      throw new ValidationError(errors);
    }

    const id = parseInt(req.params.id);
    if (!id) {
      throw new ValidationError("product id should be number");
    }

    const data = await catalogService.updateProduct({ id, ...input });
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    next(error);
  }
};

const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query["limit"]) || 10;
  const offset = Number(req.query["offset"]) || 0;
  try {
    const data = await catalogService.getProducts(limit, offset);
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    next(error);
  }
};

const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new ValidationError("product id should be number");
  }

  try {
    const data = await catalogService.getProduct(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new ValidationError("product id should be number");
  }

  try {
    const data = await catalogService.deleteProduct(id);
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    next(error);
  }
};

const getProductStockController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await catalogService.getProductStock(req.body.ids);
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    next(error);
  }
};

export {
  createProductController,
  editProductController,
  getProductsController,
  getProductController,
  deleteProductController,
  getProductStockController,
};
