import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  changePasswordForm:FormGroup;
  changeNameForm:FormGroup;

  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router,
    private errorService:ErrorService){}
  
  ngOnInit(): void {
    this.getUser();
    this.createChangePasswordForm();
    this.createChangeNameForm();
  }

  createChangePasswordForm(){
    this.changePasswordForm=this.formBuilder.group({
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required],
      confirmNewPassword:["",Validators.required]
    })
  }

  createChangeNameForm(){
    this.changeNameForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  updateUser(){
    if(this.changeNameForm.valid){
      let userToUpdated:User=Object.assign({},this.changeNameForm.value);
      userToUpdated.email=this.user.email;
      userToUpdated.id=this.user.id;

      this.userService.updateUser(userToUpdated).subscribe(response=>{
        this.toastrService.success(response.message);
        this.goHomePage();
      })
    }
    else{
      this.toastrService.error("Hatalı bilgi girişi");
    }
  }

  changePassword(){
    if(this.changePasswordForm.valid){
      let changePasswordModel=Object.assign({},this.changePasswordForm.value);
      
      if(changePasswordModel.newPassword!=changePasswordModel.confirmNewPassword){
        this.toastrService.error("Şifreler aynı değil","Hata");
        return;
      }

      delete changePasswordModel["confirmNewPassword"];
      changePasswordModel.email = this.user.email;

      this.authService.changePassword(changePasswordModel).subscribe(response=>{
        this.toastrService.success(response.message);
        this.logOutAndGoLoginPage();
      },errorResponse=>{
        this.toastrService.error("Hatalı şifre","Hata!");
      });
    }
    else{
      this.toastrService.error("Geçersiz şifre bilgileri","Hata!");
    }
  }

  logOutAndGoLoginPage(){
    this.authService.logOut();
    this.router.navigate(["login"]);
  }

  goHomePage(){
    this.router.navigate([""]);
  }

  getUser(){
    this.userService.getUserById(Number(localStorage.getItem("userId"))).subscribe(response=>{
      this.user=response.data;
    })
  }
}
