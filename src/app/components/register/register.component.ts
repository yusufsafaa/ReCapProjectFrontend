import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router){}
  
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel=Object.assign({},this.registerForm.value);

      this.authService.register(registerModel).subscribe(response=>{
        this.router.navigate([""]);
        this.toastrService.info("Kayıt başarıyla tamamlandı");
        this.toastrService.info(response.message);
        localStorage.setItem("token",response.data.token);
      },errorResponse=>{
        this.router.navigate(["register"]);
        this.toastrService.error(errorResponse.error.message);
      })
    }
    else{
      this.toastrService.warning("Hatalı Form!");
    }
  }
}
