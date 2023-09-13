import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'https://localhost:7291/api/carts/';

  constructor(private toastrService:ToastrService,
    private httpClient:HttpClient) { }

  addToCart(cartItem:CartItem):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",cartItem);
  }

  removeFromCart(cartItem:CartItem){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",cartItem);
  }

  clearUserCart(userId:number){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deleteallbyuserid?userId="+userId,userId);
  }

  listOfUserCart(userId:number):Observable<ListResponseModel<CartItem>>{
    return this.httpClient.get<ListResponseModel<CartItem>>(this.apiUrl+"getallbyuserid?userId="+userId);
  }
}
