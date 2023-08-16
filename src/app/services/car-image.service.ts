import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = 'https://localhost:7291/api/carImages/';

  constructor(private httpClient: HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"getall");
  }

  getCarImagesByCar(carId:number):Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"getimagesbycarid?carId="+carId);
  }
}
