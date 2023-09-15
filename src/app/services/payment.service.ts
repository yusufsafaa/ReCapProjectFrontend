import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl="https://localhost:7291/api/payments/";

  constructor(private httpClient:HttpClient) { }

  addPayment(paymentModel:Payment):Observable<SingleResponseModel<number>>{
    return this.httpClient.post<SingleResponseModel<number>>(this.apiUrl+"add",paymentModel);
  }
}
