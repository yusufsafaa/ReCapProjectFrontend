import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';
import { CarDetail } from '../models/carDetail';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService:ToastrService) { }

  addToCart(car:CarDetail){
    let item=CartItems.find(c=>c.car.carId===car.carId)

    if(item){
      this.toastrService.warning("Zaten sepette mevcut",car.brandName+" "+car.carModel);
    }
    else{
      let cartItem=new CartItem();
      cartItem.car=car;
      cartItem.quantity=1;
      CartItems.push(cartItem);
      this.toastrService.success("Sepete Eklendi",car.brandName+" "+car.carModel);
    }
  }

  removeFromCart(car:CarDetail){
    let item:CartItem=CartItems.find(c=>c.car.carId===car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
    this.toastrService.error("Sepetten silindi",car.brandName+" "+car.carModel);
  }

  list(){
    return CartItems;
  }
}
