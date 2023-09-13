import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl="https://localhost:7291/api/payments/";

  constructor(private httpClient:HttpClient) { }

  addPayment(paymentModel:Payment){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",paymentModel);
  }
}
