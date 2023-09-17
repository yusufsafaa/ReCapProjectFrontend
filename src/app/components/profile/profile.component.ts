import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';

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
    private formBuilder:FormBuilder){}
  
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
      newFirstName:["",Validators.required],
      newLastName:["",Validators.required]
    })
  }

  getUser(){
    this.userService.getUserById(Number(localStorage.getItem("userId"))).subscribe(response=>{
      this.user=response.data;
    })
  }

}
