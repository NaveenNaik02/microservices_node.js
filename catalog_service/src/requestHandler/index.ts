import { RequestHandler } from "express";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { STATUS_CODES } from "../utils";

export const catalogService = new CatalogService(new CatalogRepository());

export const createProductHandler: RequestHandler = async (
  req,
  res,
  _next
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
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: err.message });
  }
};

export const editProductHandler: RequestHandler = async (req, res, _next) => {
  try {
    const { errors, input } = await RequestValidator(
      UpdateProductRequest,
      req.body
    );
    if (errors) {
      res.status(STATUS_CODES.BAD_REQUEST).json(errors);
      return;
    }

    const id = parseInt(req.params.id);
    if (!id) {
      res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "product id should be number" });
      return;
    }

    const data = await catalogService.updateProduct({ id, ...input });
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: err.message });
  }
};

export const getProductsHandler: RequestHandler = async (req, res, _next) => {
  const limit = Number(req.query["limit"]) || 10;
  const offset = Number(req.query["offset"]) || 0;
  try {
    const data = await catalogService.getProducts(limit, offset);
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ error: err.message });
  }
};

export const getProductHandler: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "product id should be number" });
    return;
  }

  try {
    const data = await catalogService.getProduct(id);
    res.status(200).json(data);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteProductHandler: RequestHandler = async (req, res, _next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "product id should be number" });
    return;
  }

  try {
    const data = await catalogService.deleteProduct(id);
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(STATUS_CODES.INTERNAL_ERROR).json({ message: err.message });
  }
};

export const getProductStockHandler: RequestHandler = async (
  req,
  res,
  _next
) => {
  try {
    const data = await catalogService.getProductStock(req.body.ids);
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(STATUS_CODES.BAD_REQUEST).json({
      message: err.message,
    });
  }
};
