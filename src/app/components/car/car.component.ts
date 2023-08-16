import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetail[] = [];
  carImages:CarImage[]=[];
  imageOfPath:string;
  baseUrl="https://localhost:7291/Uploads/CarImages";


  constructor(private carService: CarService, 
    private activatedRoute:ActivatedRoute, 
    private carImageService:CarImageService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else{
        this.getDetails();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getDetails() {
    this.carService.getDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarImagesByCar(carId:number){
    this.carImageService.getCarImagesByCar(carId).subscribe((response)=>{
      const imagePath=response.data[0].imagePath;
      this.imageOfPath=this.baseUrl+imagePath;
    })
    return this.imageOfPath;
  }
}
