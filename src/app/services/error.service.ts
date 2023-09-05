import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService:ToastrService) { }

  showErrorMessage(errorResponse:any, otherErrorMessage:string){
    if(errorResponse.error.Errors && errorResponse.error.Errors.length>0){
      for (let i = 0; i < errorResponse.error.Errors.length; i++) {
        this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
      }
    }
    else{
      this.toastrService.error(errorResponse.error.Message,otherErrorMessage);
    }
  }
}
