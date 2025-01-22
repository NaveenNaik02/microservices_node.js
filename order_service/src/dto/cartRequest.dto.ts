import { IsNumber } from "class-validator";

export class CreateCart {
  @IsNumber()
  id: number;

  @IsNumber()
  qty: number;
}
