// src/app/models/create-order-request.model.ts
export interface CreateOrderRequest {
  productIds: number[]; // or objects if you prefer
  amount: number; // rupees
}
