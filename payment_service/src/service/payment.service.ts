import { IPaymentService } from "../interface";
import { AuthorizeError, GetOrderDetails } from "../utils";

export class PaymentService implements IPaymentService {
  async createPayment(userId: number, orderId: number): Promise<any> {
    const order = await GetOrderDetails(orderId);

    if (order.customerId !== userId) {
      throw new AuthorizeError("user not authorized to create payment");
    }

    //create new payment record

    //call payment gateway to create payment

    //return payment secret

    return {
      secret: "secrete",
      pubKey: "public key",
      amount: 100,
    };
  }

  async verifyPayment(paymentId: string): Promise<void> {
    //call payment gateway to verify payment
    //update order status through message broker
    //return payment status
  }
}
