import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';

import { environment as env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripeTest: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['Mohammad Amir', [Validators.required]],
      amount: [1000, [Validators.required, Validators.pattern(/\d+/)]],
    });
  }
  loading = false;
  pay(): void {
    this.loading =true;
    if (this.stripeTest.valid) {
      this.createPaymentIntent(this.stripeTest.value.amount*100).subscribe(async (data) => {
        this.stripeService
        //@ts-ignore
        .confirmCardPayment(data.client_secret, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              name: this.stripeTest.value.name,
            },
          },
        })
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            alert(result.error.message);
            this.loading = false;
          } else {
            // The payment has been processed!
            //@ts-ignore
            if (result.paymentIntent.status === 'succeeded') {
              this.loading = false;
              alert('Wow! you made a payment of Rs. ' + this.stripeTest.value.amount);
            }
          }
        });
      })

    } else {
      console.log(this.stripeTest);
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${env.apiUrl}/create-payment-intent`,
      { amount }
    );
  }
}
