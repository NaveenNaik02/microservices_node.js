import { Container } from "inversify";
import { PaymentService } from "../service/payment.service";
import { IPaymentService } from "../interface";
import { TYPES } from "./constants";

export const container = new Container();

container.bind<IPaymentService>(TYPES.PAYMENT_SERVICE).to(PaymentService);
