import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:7291/api/users/"

  constructor(private httpClient:HttpClient) { }

  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getuserbymail?email="+email);
  }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"getuserbyid?userId="+userId);
  }

  updateUser(user:User){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update",user);
  }
}
