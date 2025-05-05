import axios from "axios";
import { AuthorizeError, NotFoundError } from "../error";
import { InProcessOrder, User } from "../../dto";

const AUTH_SERVICE_BASE_URL =
  process.env.AUTH_SERVICE_BASE_URL || "http://localhost:8003";

const ORDER_SERVICE_BASE_URL =
  process.env.ORDER_SERVICE_BASE_URL || "http://localhost:8001";

export const ValidateUser = async (token: string) => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      throw new AuthorizeError("user not authorized");
    }
    return response.data as User;
  } catch (error) {
    throw new AuthorizeError("user not found");
  }
};

export const GetOrderDetails = async (orderNumber: number) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE_BASE_URL}/orders/${orderNumber}/checkout`
    );
    return response.data as InProcessOrder;
  } catch (error) {
    throw new NotFoundError("product not found");
  }
};
