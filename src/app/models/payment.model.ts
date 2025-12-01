export interface PaymentModel {
  orderId: string;
  currency: string;
  grandTotal: number;
  razorpayKey: string;
  receipt: string;
}
