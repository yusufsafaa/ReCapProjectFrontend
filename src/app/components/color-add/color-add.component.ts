import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;

  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private errorService:ErrorService){}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel=Object.assign({},this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,colorModel.name);
      },responseError=>{
        this.errorService.showErrorMessage(responseError,"Renk eklenemedi");
      })
    }
    else{
      this.toastrService.warning("Hatalı Form!");
    }
  }
}
