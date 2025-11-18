import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { CartItem } from '../cart/cart.reducer';
import { map } from 'rxjs/operators';
import { OrderModel } from '../../../models/order.model';
import { clearCart } from '../cart/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItems$!: Observable<CartItem[]>;
  total$!: Observable<number>;

  currentUser = {
    id: 1,
    name: "Guest User",
    email: "guest@example.com",
    contact: ""
  };

  constructor(
    private paymentSvc: PaymentService,
    private store: Store<{ cart: CartItem[] }>,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select('cart');

    this.total$ = this.cartItems$.pipe(
      map(items => items.reduce((total, i) => total + i.price * i.quantity, 0))
    );
  }

  async placeOrderAndPay() {
    const items = await firstValueFrom(this.cartItems$);

    if (!items.length) {
      this.snack.open('Your cart is empty.', 'Close', { duration: 2000 });
      return;
    }

    const amount = items.reduce((t, i) => t + i.price * i.quantity, 0);
    const productIds = items.map(x => x.id);

    try {
      const order = await firstValueFrom(
        this.paymentSvc.createOrderForCart({ productIds, amount })
      );

      const options = {
        key: order.razorpayKey,
        amount: order.grandTotal,
        currency: order.currency,
        name: "FitCart",
        description: "Order Payment",
        order_id: order.orderId,

        handler: async (response: any) => {
          const orderModel: OrderModel = {
            userId: this.currentUser.id,
            rzp_OrderId: response.razorpay_order_id,
            rzp_PaymentId: response.razorpay_payment_id,
            rzp_Signature: response.razorpay_signature,
            receipt: order.receipt,
            cartId: undefined,
            products: items.map(i => ({
              itemId: i.id,
              quantity: i.quantity
            }))
          };

          try {
            await firstValueFrom(this.paymentSvc.verifyPayment(orderModel));

            this.snack.open("Payment successful!", "OK", { duration: 2500 });
            this.store.dispatch(clearCart());
            this.router.navigate(['/user/orders']);
          } catch (err) {
            this.snack.open("Payment verification failed!", "OK", { duration: 3000 });
          }
        },

        prefill: {
          name: this.currentUser.name,
          email: this.currentUser.email,
          contact: this.currentUser.contact
        },

        theme: { color: "#3f51b5" }
      };

      new Razorpay(options).open();

    } catch (err) {
      this.snack.open("Unable to create order.", "Retry", { duration: 3000 });
    }
  }
}
