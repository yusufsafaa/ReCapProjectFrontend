import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-succesful',
  templateUrl: './payment-succesful.component.html',
  styleUrls: ['./payment-succesful.component.css']
})
export class PaymentSuccesfulComponent implements OnInit{
  payment:Payment;

  constructor(private paymentService:PaymentService){}
  
  ngOnInit(): void {
    this.getPayment();
  }

  getPayment(){
    this.paymentService.getLastPaymentOfCustomer(Number(localStorage.getItem("customerId"))).subscribe(response=>{
      this.payment=response.data;
    });
  }
}
