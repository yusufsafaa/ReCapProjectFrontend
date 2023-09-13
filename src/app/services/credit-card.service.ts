import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCard } from '../models/creditCard';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { CustomerCreditCard } from '../models/customerCreditCard';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl="https://localhost:7291/api/creditcards/";

  constructor(private httpClient:HttpClient) { }

  saveCreditCard(creditCard:CreditCard):Observable<SingleResponseModel<number>>{
    return this.httpClient.post<SingleResponseModel<number>>(this.apiUrl+"savecreditcard",creditCard);
  }

  saveCreditCardToCustomer(customerCreditCard:CustomerCreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"savecreditcardtocustomer",customerCreditCard);
  }
}
