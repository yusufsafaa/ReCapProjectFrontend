import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems:CartItem[]=[];
  carDetails:CarDetail[]=[];
  
  constructor(private cartService:CartService,
    private toastrService:ToastrService,
    private carDetailService:CarDetailService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCarDetail(){
    for (let i = 0; i < this.cartItems.length; i++) {
      this.carDetailService.getCarDetailByCarId(this.cartItems[i].carId).subscribe(response=>{
        let newCarDetails:CarDetail[]=response.data
        this.carDetails[i]=(newCarDetails[0]);
      })
    }
  }

  getCart(){
    this.cartService.listOfUserCart(Number(localStorage.getItem("userId"))).subscribe(response=>{
      this.cartItems=response.data
      this.getCarDetail();
    })
  }

  removeFromCart(cartItemIndex:number){
    this.cartService.removeFromCart(this.cartItems[cartItemIndex]).subscribe(response=>{
      this.toastrService.info("Araç sepetten silindi",this.carDetails[cartItemIndex].brandName+" "+this.carDetails[cartItemIndex].carModel);
    })
  }

  clearUserCart(){
    this.cartService.clearUserCart(Number(localStorage.getItem("userId"))).subscribe(response=>{
      this.toastrService.success("Sepet temizlendi");
    })
  }
}
