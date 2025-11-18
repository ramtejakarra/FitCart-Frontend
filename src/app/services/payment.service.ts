// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PaymentModel } from '../models/payment.model';
import { CreateOrderRequest } from '../models/create-order-request.model';
import { OrderModel } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private base = `${environment.apiUrl}/Payment`;

  constructor(private http: HttpClient) {}

  // ask backend to create a razorpay order and return PaymentModel
  createOrderForCart(payload: CreateOrderRequest): Observable<PaymentModel> {
    return this.http.post<PaymentModel>(`${this.base}/create-order`, payload);
  }

  // after razorpay success, send details to backend for verification & DB save
  verifyPayment(order: OrderModel) {
    return this.http.post<any>(`${this.base}/verify`, order);
  }
}
