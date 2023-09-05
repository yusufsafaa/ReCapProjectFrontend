import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private errorService:ErrorService){}
  
  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      carModel:["",Validators.required]
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel=Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message);
      },responseError=>{
        this.errorService.showErrorMessage(responseError,"Araç eklenemedi");
      }) 
    }
    else{
      this.toastrService.error("Hatalı Form!");
    }
  }
}
