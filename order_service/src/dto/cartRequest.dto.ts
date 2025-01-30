import { IsNumber } from "class-validator";

export class CreateCart {
  @IsNumber()
  productId: number;

  @IsNumber()
  qty: number;
}
