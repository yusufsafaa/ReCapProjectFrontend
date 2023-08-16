import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{
  carDetails: CarDetail[]=[];
  carImages:CarImage[]=[];
  imageOfPath:string;
  imageUrl="https://localhost:7291/Uploads/CarImages";
  currentImage: CarImage;
  currentCar:Car;

  constructor(private activatedRoute:ActivatedRoute,
    private carDetailService:CarDetailService,
    private carImageService:CarImageService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarImagesByCarId(params["carId"])
        this.getCarDetailByCarId(params["carId"])
      }
    })
  }

  getCarDetailByCarId(carId:number){
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response)=>{
      this.carDetails=response.data;
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCar(carId).subscribe((response)=>{
      this.carImages=response.data;
    })
  }

  getImagePath(carImage: CarImage) {
    let path = this.imageUrl + carImage.imagePath;
    return path;
  }

}
