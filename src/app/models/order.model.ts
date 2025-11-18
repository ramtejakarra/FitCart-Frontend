// src/app/models/order.model.ts
export interface OrderProduct {
  itemId: number;
  quantity: number;
}

export interface OrderModel {
  userId: number;
  rzp_OrderId: string;
  rzp_PaymentId: string;
  rzp_Signature: string;
  receipt: string;
  cartId?: string;
  products?: OrderProduct[];
}
