import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = 'https://localhost:7291/api/cars/';

  constructor(private httpClient:HttpClient) { }

  getCarDetailByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl+"getdetailbycarid?carId=" + carId);
  }
}
