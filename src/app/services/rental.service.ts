import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:7291/api/rentals/";

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getall");
  }

  getDetails():Observable<ListResponseModel<RentalDetail>>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl+"getrentaldetails");
  }

  addRentals(rentalModel:Rental){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rentalModel);
  }

  checkIfCarCanBeRented(carId:number,rentDate:Date,returnDate:Date):Observable<SingleResponseModel<boolean>>{
    return this.httpClient.get<SingleResponseModel<boolean>>(this.apiUrl+"checkifcarcanberented?carId="+carId+"&rentDate="+rentDate.toISOString()+"&returnDate="+returnDate.toISOString());
  }
}
