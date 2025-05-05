export interface IPaymentService {
  createPayment(
    userId: number,
    orderId: number
  ): Promise<{ secret: string; pubKey: string; amount: number }>;
  verifyPayment(paymentId: string): Promise<void>;
}
