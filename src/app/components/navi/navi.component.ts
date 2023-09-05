import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {
  
  constructor(private toastrService:ToastrService){}
  
  isLoggedIn(){
    return localStorage.getItem("token")?true:false;
  }

  logOut(){
    localStorage.removeItem("token");
    this.toastrService.info("Çıkış Yapıldı");
  }
}
