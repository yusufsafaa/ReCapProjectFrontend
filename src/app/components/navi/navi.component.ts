import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user:User;
  
  constructor(private toastrService:ToastrService,
    private userService:UserService){}
  
  ngOnInit(): void {
    this.getUserById();
  }
  
  isLoggedIn(){
    return localStorage.getItem("token")?true:false;
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("customerId");
    this.toastrService.info("Çıkış Yapıldı");
  }

  getUserById(){
    this.userService.getUserById(Number(localStorage.getItem("userId"))).subscribe(response=>{
      this.user=response.data
    })
  }
}
