// src/app/models/payment.model.ts
export interface PaymentModel {
  razorpayKey: string;
  currency: string;
  grandTotal: number; // in paise (backend returns amount*100)
  receipt: string;
  orderId: string;
}
