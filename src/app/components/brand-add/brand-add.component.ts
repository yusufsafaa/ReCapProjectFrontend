import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup;  

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private errorService:ErrorService){}

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel=Object.assign({},this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,brandModel.name)
      },responseError=>{
        this.errorService.showErrorMessage(responseError,"Marka eklenemedi");
      })
    }
    else{
      this.toastrService.warning("Hatalı Form!");
    }
  }
}
