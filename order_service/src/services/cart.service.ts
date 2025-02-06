import { inject, injectable } from "inversify";
import { CartLineItem } from "../db/schema";
import { ICartRepository, ICartService } from "../interfaces";
import { GetProductDetails, GetStockDetails } from "../utils/broker";
import { AuthorizeError, NotFoundError } from "../utils/error";
import { TYPES } from "../utils/constants";

@injectable()
export class CartService implements ICartService {
  private repo: ICartRepository;
  constructor(@inject(TYPES.CART_REPOSITORY) repo: ICartRepository) {
    this.repo = repo;
  }

  async createCart(input: any): Promise<CartLineItem | null> {
    // get product from catalog service
    const product = await GetProductDetails(input.productId);
    if (product.stock < input.qty) {
      throw new NotFoundError("product is out of stock");
    }

    // if product is already in the cart
    const lineItem = await this.repo.findCartByProductId(2, product.id);
    if (lineItem?.qty + input.qty > product.stock) {
      throw new NotFoundError("product is out of stock");
    }

    if (lineItem) {
      return this.repo.updateCart(lineItem.id, lineItem.qty + input.qty);
    }

    const result = await this.repo.createCart(input.customerId, {
      productId: product.id,
      price: product.price.toString(),
      qty: input.qty,
      itemName: product.name,
      variant: product.variant,
    });

    return result;
  }

  async getCart(id: number) {
    const cart = await this.repo.findCart(id);

    if (!cart) {
      throw new NotFoundError("cart does not exist");
    }

    const lineItems = cart.lineItems;
    if (!lineItems.length) {
      throw new NotFoundError("cart is empty");
    }

    // verify with inventory service if the product is still available
    const ids = lineItems.map((item) => item.productId);
    const stockDetails = await GetStockDetails(ids);

    if (Array.isArray(stockDetails)) {
      lineItems.forEach((lineItem) => {
        const stockItem = stockDetails.find(
          (stock) => stock.id === lineItem.productId
        );
        if (stockItem) {
          lineItem.availability = stockItem.stock;
        }
      });

      // update cart line items
      cart.lineItems = lineItems;
    }
    return cart;
  }

  async editCart(lineItemId: number, customerId: number, qty: number) {
    await this.#authorizedCart(lineItemId, customerId);
    const data = await this.repo.updateCart(lineItemId, qty);
    return data;
  }

  async #authorizedCart(lineItemId: number, customerId: number) {
    const cart = await this.repo.findCart(customerId);
    if (!cart) {
      throw new NotFoundError("cart does not exists");
    }

    const lineItem = cart.lineItems.find((item) => item.id === lineItemId);
    if (!lineItem) {
      throw new AuthorizeError("you are not authorized to edit this cart");
    }

    return lineItem;
  }

  async deleteCart(lineItemId: number, customerId: number) {
    await this.#authorizedCart(lineItemId, customerId);
    const data = await this.repo.deleteCart(lineItemId);
    return data;
  }
}
