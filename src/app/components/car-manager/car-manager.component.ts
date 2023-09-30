import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.css']
})
export class CarManagerComponent implements OnInit {
  carDetails:CarDetail[]=[];
  baseImageUrl="https://localhost:7291/Uploads/CarImages";
  
  constructor(private carService:CarService){}
  
  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails(){
    this.carService.getDetails().subscribe(response=>{
      this.carDetails=response.data;
    })
  }
}
