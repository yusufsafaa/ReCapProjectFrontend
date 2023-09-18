import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/registerModel';
import { ChangePasswordModel } from '../models/changePasswordModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:7291/api/auth/';

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel);
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("customerId");
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  changePassword(changePasswordModel:ChangePasswordModel){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"changepassword",changePasswordModel);
  }


}
