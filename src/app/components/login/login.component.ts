import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private userService:UserService,
    private customerService:CustomerService){}
  
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        this.router.navigate([""]);
        this.toastrService.info(response.message);

        this.userService.getUserByMail(loginModel.email).subscribe(userResponse=>{
          localStorage.setItem("userId",userResponse.data.id.toString());

          this.customerService.getCustomerByUserId(userResponse.data.id).subscribe(customerResponse=>{
            if(customerResponse.data!=null){
              localStorage.setItem("customerId",customerResponse.data.id.toString());
            }
          })
        })

        localStorage.setItem("token",response.data.token);
      },errorResponse=>{
        this.router.navigate(["login"]);
        this.toastrService.error(errorResponse.error.message);
      })
    }
    else{
      this.toastrService.warning("Hatalı Form!");
    }
  }
}
