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

  // Backend returns a flat PaymentModel
  createOrderForCart(payload: CreateOrderRequest): Observable<PaymentModel> {
    return this.http.post<PaymentModel>(`${this.base}/create-order`, payload);
  }

  verifyPayment(order: OrderModel) {
    return this.http.post<any>(`${this.base}/verify`, order);
  }
}
