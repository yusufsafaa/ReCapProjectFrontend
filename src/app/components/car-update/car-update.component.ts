import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { FormGroup,FormBuilder,FormControl,Validators, Form } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carDetails:CarDetail[]=[];
  brands:Brand[]=[];
  colors:Color[]=[];
  carUpdateForm:FormGroup;
  carId:number;

  constructor(private activatedRoute:ActivatedRoute,
    private carDetailService:CarDetailService,
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private carService:CarService,
    private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.carId=params["carId"];
      }
    })
    
    this.getBrands();
    this.getColors();
    this.createCarUpdateForm();
  }

  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carModel:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel:Car=Object.assign({},this.carUpdateForm.value);
      carModel.id=this.carId;
      this.carService.update(carModel).subscribe(Response=>{
        this.toastrService.success("Araç başarıyla güncellendi");
        this.router.navigate(["/cars/manager"]);
      })
    }
    else{
      this.toastrService.warning("Hatalı Form!");
    }
  }

  getCarDetail(carId:number){
    this.carDetailService.getCarDetailByCarId(carId).subscribe(response=>{
      this.carDetails=response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
}
