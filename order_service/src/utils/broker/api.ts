import axios from "axios";
import { Product, User } from "../../dto";
import { APIError, AuthorizeError, NotFoundError } from "../error";

const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:8000";

const AUTH_SERVICE_BASE_URL =
  process.env.AUTH_SERVICE_BASE_URL || "http://localhost:8003";

export const GetProductDetails = async (
  productId: number
): Promise<Product> => {
  try {
    const response = await axios.get(
      `${CATALOG_BASE_URL}/products/${productId}`
    );
    if (!response.data) {
      throw new NotFoundError("product not found");
    }
    return response.data as Product;
  } catch (error) {
    throw new APIError(
      "error while fetching the product details from catalog service"
    );
  }
};

export const GetStockDetails = async (ids: number[]) => {
  try {
    const response = await axios.post(`${CATALOG_BASE_URL}/products/stock`, {
      ids,
    });
    if (!response.data) {
      throw new NotFoundError("error while getting the stock details");
    }
    return response.data as Product[];
  } catch (error) {
    throw new APIError(
      "error while getting stock details form catalog service"
    );
  }
};

export const ValidateUser = async (token: string) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.data !== 200) {
      throw new AuthorizeError("user not authorized");
    }
    return response.data as User;
  } catch (error) {
    throw new APIError("error while validating user from auth service");
  }
};
