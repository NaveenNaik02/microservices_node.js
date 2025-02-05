import { IsNumber } from "class-validator";

export class CreateCart {
  @IsNumber()
  productId: number;

  @IsNumber()
  qty: number;
}

export class UpdateCart {
  @IsNumber()
  qty: number;
}

export class EditCart {
  @IsNumber()
  cartId: number;

  @IsNumber()
  qty: number;
}

export interface CartLineItem {
  id: number;
  productId: number;
  itemName: string;
  price: string;
  qty: number;
  variant: string | null;
  createdAt: Date;
  updatedAt: Date;
  availability?: number;
}

export interface CartWithLineItems {
  id: number;
  customerId: number;
  lineItems: CartLineItem[];
  createdAt: Date;
  updatedAt: Date;
}
